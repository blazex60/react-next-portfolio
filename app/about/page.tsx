import { profileData } from "@/libs/data";
import { Win95Window } from "@/app/components/RetroUI";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto font-sans">
      <Win95Window title="System_Properties.exe">
        {/* ヘッダーエリア */}
        <div className="flex gap-6 mb-8 items-start">
          {/* コンピュータアイコン（装飾） */}
          <div className="text-6xl select-none">🖥️</div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{profileData.name}</h1>
            <p className="text-[#000080] font-bold mb-4">
              {profileData.role}
            </p>
            <div className="win95-border-in bg-white p-4 h-32 overflow-y-scroll text-sm leading-relaxed">
              {profileData.summary}
            </div>
          </div>
        </div>

        {/* スキルセクション */}
        <section className="mb-8">
          <fieldset className="border border-white shadow-[inset_1px_1px_0px_#808080,1px_1px_0px_#ffffff] p-4">
            <legend className="px-1 text-sm">Technical Skills</legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {profileData.skills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between text-sm">
                  <span>{skill.name}</span>
                  <div className="flex gap-0.5 border border-gray-500 bg-white p-0.5">
                    {/* レベルバー：四角いブロックにする */}
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-3 w-4 border border-gray-400 ${
                          i < skill.level
                            ? "bg-[#000080]"
                            : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        </section>

        {/* 経歴セクション */}
        <section>
          <fieldset className="border border-white shadow-[inset_1px_1px_0px_#808080,1px_1px_0px_#ffffff] p-4">
            <legend className="px-1 text-sm">History.log</legend>
            <div className="win95-border-in bg-white p-2 h-48 overflow-y-scroll font-mono text-sm">
              {profileData.histories.map((item, index) => (
                <div key={index} className="mb-4">
                  <span className="text-gray-500">[{item.year}]</span>
                  <div className="font-bold">{item.title}</div>
                  <div className="pl-4 border-l-2 border-gray-300 ml-1 text-xs text-gray-700">
                    &gt; {item.description}
                  </div>
                </div>
              ))}
              <div className="animate-pulse">_</div>
            </div>
          </fieldset>
        </section>
      </Win95Window>
    </main>
  );
}