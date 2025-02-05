import Header from "@/component/header/header";
import Board from "./component/board/board";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full grid md:grid-cols-6">
        <div className="md:col-span-1"></div>
        <div className="px-5 md:col-span-5">
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
