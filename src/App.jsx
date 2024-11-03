import Home from "./pages/home/home";

function App() {
  return (
    <main className="">
      <header className="py-6 bg-slate-100">
        <h1 className="text-center text-2xl font-semibold">
          Multiplayer Shiritori Game
        </h1>
      </header>
      <main className="container mx-auto ">
        <Home />
      </main>
    </main>
  );
}

export default App;
