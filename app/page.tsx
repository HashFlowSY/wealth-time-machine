import DataWrapper from "../components/DataWrapper";
import FormulaWrapper from "../components/FormulaWrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans relative">
      <FormulaWrapper />
      <DataWrapper />
    </div>
  );
}
