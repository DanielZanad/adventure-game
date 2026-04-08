import { Map as MapIcon, ShelvingUnit, Skull, Key, Scroll } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger, Dialog } from "./components/ui/dialog";

function App() {
  return (
    // Added a dark background to make the amber pop, giving it that retro terminal feel
    <div className="h-screen flex justify-center items-center bg-zinc-950 text-amber-500 font-mono">
      <div className="w-3/4 h-3/4 flex flex-col justify-center">
        <div className="w-full h-full flex border-2 border-amber-500 bg-black shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          
          {/* SIDEBAR */}
          <div className="w-16 h-full flex flex-col p-2 space-y-4 border-r-2 border-amber-500/50 bg-zinc-900/50">
            
            {/* INVENTORY DIALOG */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-12 border-amber-500/50 text-amber-500 hover:bg-amber-500/20 hover:text-amber-400 cursor-pointer">
                  <ShelvingUnit size={24} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-950 border-2 border-amber-500 text-amber-500 font-mono sm:max-w-md shadow-[0_0_30px_rgba(245,158,11,0.15)]">
                <DialogHeader>
                  <DialogTitle className="text-xl uppercase tracking-widest border-b border-amber-500/30 pb-2">
                    Inventory
                  </DialogTitle>
                </DialogHeader>
                {/* Inventory Grid */}
                <div className="grid grid-cols-4 gap-3 py-4">
                  {/* Slot 1: Filled */}
                  <div className="aspect-square flex flex-col items-center justify-center border border-amber-500/40 bg-zinc-900 hover:bg-amber-500/10 cursor-pointer transition-colors">
                    <Key size={28} className="mb-1" />
                    <span className="text-[10px] uppercase">Rusted Key</span>
                  </div>
                  {/* Slot 2: Filled */}
                  <div className="aspect-square flex flex-col items-center justify-center border border-amber-500/40 bg-zinc-900 hover:bg-amber-500/10 cursor-pointer transition-colors">
                    <Scroll size={28} className="mb-1" />
                    <span className="text-[10px] uppercase">Torn Note</span>
                  </div>
                  {/* Empty Slots */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square border border-zinc-800 bg-zinc-950 flex items-center justify-center opacity-50">
                      <span className="text-zinc-700 text-xs">- empty -</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-amber-500/60 mt-2">
                  Weight: 2/8
                </div>
              </DialogContent>
            </Dialog>

            {/* MAP DIALOG */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-12 border-amber-500/50 text-amber-500 hover:bg-amber-500/20 hover:text-amber-400 cursor-pointer">
                  <MapIcon size={24} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-950 border-2 border-amber-500 text-amber-500 font-mono sm:max-w-lg shadow-[0_0_30px_rgba(245,158,11,0.15)]">
                <DialogHeader>
                  <DialogTitle className="text-xl uppercase tracking-widest border-b border-amber-500/30 pb-2">
                    Local Map
                  </DialogTitle>
                </DialogHeader>
                
                {/* Stylized Map Area */}
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="flex items-center space-x-4">
                    {/* Unexplored Room */}
                    <div className="w-16 h-12 border border-zinc-700 flex items-center justify-center">
                      <span className="text-zinc-700">?</span>
                    </div>
                    <div className="w-8 h-px bg-zinc-700"></div>
                    {/* Explored Room */}
                    <div className="w-16 h-12 border border-amber-500/50 bg-zinc-900 flex items-center justify-center">
                      <span className="text-xs">Hall</span>
                    </div>
                    <div className="w-8 h-px bg-amber-500/50"></div>
                    {/* Boss/Danger Room */}
                    <div className="w-16 h-12 border border-red-500/50 flex items-center justify-center text-red-500">
                      <Skull size={20} />
                    </div>
                  </div>
                  
                  <div className="flex space-x-12 pr-24">
                     <div className="w-px h-8 bg-zinc-700"></div>
                     <div className="w-px h-8 bg-amber-500/50"></div>
                  </div>

                  <div className="flex items-center space-x-4">
                     {/* Unexplored Room */}
                     <div className="w-16 h-12 border border-zinc-700 flex items-center justify-center">
                      <span className="text-zinc-700">?</span>
                    </div>
                    <div className="w-8 h-px bg-zinc-700"></div>
                    {/* Current Location */}
                    <div className="w-16 h-12 border-2 border-amber-400 bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.4)] flex items-center justify-center animate-pulse">
                      <span className="text-xs font-bold text-amber-300">You</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-amber-500/60 mt-2 flex justify-between">
                  <span>Sector: map sector</span>
                  <span>[ Signal Lost ]</span>
                </div>
              </DialogContent>
            </Dialog>

          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex flex-1 flex-col p-4 bg-zinc-950/50">
            {/* History / Output Log */}
            <div className="flex flex-col flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-amber-500/20">
              <div className="text-amber-500/70">
                <span className="text-amber-600 font-bold">{">"} Action command</span>
                <p className="mt-1">Action command result example</p>
              </div>
              <div className="text-amber-400">
                <span className="text-amber-600 font-bold">{">"} Action command</span>
                <p className="mt-1">Action command result example</p>
              </div>
            </div>
            
            {/* Input Form */}
            <div className="flex w-full mt-auto pt-4 border-t border-amber-500/30">
              <form className="flex w-full items-center space-x-2">
                <span className="text-amber-500 font-bold text-xl">{">"}</span>
                <Input 
                  className="flex-1 bg-transparent border-none text-amber-400 placeholder:text-amber-500/30 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg rounded-none" 
                  placeholder="What will you do?" 
                  autoFocus
                />
                <Button className="bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold rounded-sm px-6">
                  EXECUTE
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;