import { useRef, useState } from "react";
import { X } from "lucide-react";
import Modal from "@/component/modal/modal";
import CardInfoModal from "@/component/card_info-modal/card_info-modal";
import { CardProps, StateType, TagTypes } from "@/type/common";
import { getTagColorClass, isMobile } from "@/util/common";
import { useKanStore } from "@/store/store";

interface TouchRef {
  startX: number;
  startY: number;
  startClientY: number;
  initialScrollY: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  currentElement: HTMLElement | null;
  clone: HTMLElement | null;
  scrollInterval: number | null;
}

const Card = ({ column }: CardProps) => {
  const { removeCard, moveCard } = useKanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const touchRef = useRef<TouchRef>({
    startX: 0,
    startY: 0,
    startClientY: 0,
    initialScrollY: 0,
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
    currentElement: null,
    clone: null,
    scrollInterval: null,
  });

  const openCreateColumnHandler = () => {
    if (!isDragging) {
      setIsModalOpen(true);
    }
  };

  const dragStartHandler = (e: React.DragEvent) => {
    e.dataTransfer.setData("columnId", column.id);
    e.dataTransfer.setData("fromState", column.state);
  };

  const touchStartHandler = (e: React.TouchEvent) => {
    if (touchRef.current.scrollInterval) {
      clearInterval(touchRef.current.scrollInterval);
    }

    const target = e.currentTarget as HTMLElement;
    const touch = e.touches[0];
    const rect = target.getBoundingClientRect();

    // 터치 포인트와 요소 경계 사이의 오프셋 계산
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;

    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startClientY: rect.top,
      initialScrollY: window.scrollY,
      width: rect.width,
      height: rect.height,
      offsetX,
      offsetY,
      currentElement: target,
      clone: null,
      scrollInterval: null,
    };

    const clone = target.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.opacity = "0.8";
    clone.style.zIndex = "1000";
    clone.style.pointerEvents = "none";
    clone.classList.add("dragging-clone");

    document.body.appendChild(clone);
    touchRef.current.clone = clone;

    target.style.opacity = "0";
    setIsDragging(true);
  };

  const touchMoveHandler = (e: React.TouchEvent) => {
    if (!touchRef.current.clone) return;

    const touch = e.touches[0];
    const EDGE_THRESHOLD = 80;
    const SCROLL_SPEED = 5;
    const viewportHeight = window.innerHeight;

    // 클론의 새 위치 계산 (오프셋 고려)
    let newTop = touch.clientY - touchRef.current.offsetY;
    const newLeft = touch.clientX - touchRef.current.offsetX;

    // 화면 경계에서 위치 고정
    if (touch.clientY < EDGE_THRESHOLD) {
      newTop = EDGE_THRESHOLD;
    } else if (touch.clientY > viewportHeight - EDGE_THRESHOLD) {
      newTop = viewportHeight - EDGE_THRESHOLD - touchRef.current.height;
    }

    // 클론 위치 업데이트
    touchRef.current.clone.style.top = `${newTop}px`;
    touchRef.current.clone.style.left = `${newLeft}px`;

    // 스크롤 처리
    if (touchRef.current.scrollInterval) {
      clearInterval(touchRef.current.scrollInterval);
      touchRef.current.scrollInterval = null;
    }

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const maxScrollY = documentHeight - viewportHeight;

    // 상단 스크롤
    if (touch.clientY < EDGE_THRESHOLD) {
      touchRef.current.scrollInterval = window.setInterval(() => {
        if (window.scrollY > 0) {
          window.scrollBy(0, -SCROLL_SPEED);
        }
      }, 16);
    }
    // 하단 스크롤
    else if (touch.clientY > viewportHeight - EDGE_THRESHOLD) {
      touchRef.current.scrollInterval = window.setInterval(() => {
        if (window.scrollY < maxScrollY) {
          window.scrollBy(0, SCROLL_SPEED);
        }
      }, 16);
    }

    // 드롭 타겟 처리
    const elementsUnderTouch = document.elementsFromPoint(
      touch.clientX,
      touch.clientY
    );

    document.querySelectorAll(".droppable-hover").forEach((el) => {
      el.classList.remove("droppable-hover");
    });
    removeDropIndicator();

    const dropTarget = elementsUnderTouch.find((el) =>
      el.classList.contains("droppable-list")
    );

    if (dropTarget) {
      dropTarget.classList.add("droppable-hover");

      const cards = Array.from(
        dropTarget.querySelectorAll(".card:not(.dragging-clone)")
      );
      const closestCard = findClosestCard(touch.clientY, cards);

      if (closestCard) {
        const rect = closestCard.getBoundingClientRect();
        const isAfter = touch.clientY > rect.top + rect.height / 2;
        updateDropIndicator(closestCard, isAfter);
      }
    }
  };

  const touchEndHandler = (e: React.TouchEvent) => {
    if (touchRef.current.scrollInterval) {
      clearInterval(touchRef.current.scrollInterval);
    }

    if (!touchRef.current.clone || !touchRef.current.currentElement) return;

    const touch = e.changedTouches[0];
    const elementsUnderTouch = document.elementsFromPoint(
      touch.clientX,
      touch.clientY
    );

    const dropTarget = elementsUnderTouch.find((el) =>
      el.classList.contains("droppable-list")
    ) as HTMLElement | undefined;

    if (dropTarget) {
      const targetState = dropTarget.dataset.state as StateType;
      if (targetState) {
        const cards = Array.from(
          dropTarget.querySelectorAll(".card:not(.dragging-clone)")
        );
        const closestCard = findClosestCard(touch.clientY, cards);
        const dropIndex = closestCard
          ? cards.indexOf(closestCard)
          : cards.length;

        console.log("a", column, targetState);
        moveCard(column.state, targetState, column.id, dropIndex);
      }
    }

    // 정리
    touchRef.current.clone.remove();
    touchRef.current.currentElement.style.opacity = "";

    document.querySelectorAll(".droppable-hover").forEach((el) => {
      el.classList.remove("droppable-hover");
    });
    removeDropIndicator();

    setIsDragging(false);
    touchRef.current = {
      startX: 0,
      startY: 0,
      startClientY: 0,
      initialScrollY: 0,
      width: 0,
      height: 0,
      offsetX: 0,
      offsetY: 0,
      currentElement: null,
      clone: null,
      scrollInterval: null,
    };
  };

  const findClosestCard = (y: number, cards: Element[]) => {
    return cards.reduce((closest, card) => {
      const rect = card.getBoundingClientRect();
      const offset = y - rect.top - rect.height / 2;

      if (!closest || Math.abs(offset) < Math.abs(closest.offset)) {
        return { element: card, offset };
      }
      return closest;
    }, null as { element: Element; offset: number } | null)?.element;
  };

  const updateDropIndicator = (card: Element, isAfter: boolean) => {
    removeDropIndicator();
    const indicator = document.createElement("div");
    indicator.className = "drop-indicator w-full h-1 bg-blue-500";

    if (isAfter) {
      card.parentNode?.insertBefore(indicator, card.nextSibling);
    } else {
      card.parentNode?.insertBefore(indicator, card);
    }
  };

  const removeDropIndicator = () => {
    document.querySelectorAll(".drop-indicator").forEach((el) => el.remove());
  };

  const handleDeleteCard = () => {
    removeCard(column);
  };

  return (
    <div>
      <div
        className="
          card 
          flex flex-col items-end
          w-full my-3 p-2 
          bg-white rounded-md shadow-md shadow-black/40
          touch-none
          select-none
        "
        onClick={openCreateColumnHandler}
        draggable={!isMobile}
        onDragStart={dragStartHandler}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
      >
        <X size={16} onClick={handleDeleteCard} className="mb-0.5" />
        <div className="w-full">
          <div className="flex flex-wrap whitespace-nowrap">
            {column.tags &&
              column.tags.map((item: TagTypes) => (
                <span
                  key={item.text}
                  className={`
                    w-fit my-0.5 mx-1 rounded px-1 
                    font-bold 
                    ${getTagColorClass(item.color)}
                  `}
                >
                  {item.text}
                </span>
              ))}
          </div>
          <div className="mt-3">{column.content}</div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CardInfoModal
          columnData={column}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Card;
