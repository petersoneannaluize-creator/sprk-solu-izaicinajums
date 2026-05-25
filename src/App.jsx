
import React from "react";
import "./style.css";

const GOAL = 25000000;
const currentSteps = 7842160;
const submitFormUrl = "https://forms.office.com/";

const checkpoints = [
  { steps: 50000, icon: "🚶", title: "Pirmais jubilejas starts" },
  { steps: 500000, icon: "🇱🇻", title: "Apieta apkārt Latvija" },
  { steps: 1000000, icon: "🌊", title: "Noieta Daugava" },
  { steps: 2000000, icon: "🐚", title: "Noiets Camino de Santiago" },
  { steps: 3000000, icon: "🧱", title: "Noiets Ķīnas mūris" },
  { steps: 7000000, icon: "⚓", title: "Apieta apkārt Baltijas jūra" },
  { steps: 12000000, icon: "🇪🇺", title: "Apieta apkārt Eiropa" },
  { steps: 15000000, icon: "🏜️", title: "Noieta Nīla" },
  { steps: 20000000, icon: "🏔️", title: "Šķērsota Eirāzija" },
  { steps: 25000000, icon: "🌍", title: "Nostaigāta gandrīz puse pasaules" },
];

const walkers = Array.from({ length: 100 }, (_, i) => ({
  name: `Darbinieks ${i + 1}`,
  steps: Math.max(12000, 125000 - i * 900),
}));

const departments = [
  { name: "Elektronisko sakaru un pasta departaments", steps: 1842000, participants: 16 },
  { name: "Enerģētikas departaments", steps: 1765000, participants: 14 },
  { name: "Ūdenssaimniecības, depozīta sistēmas un atkritumu departaments", steps: 1698000, participants: 12 },
  { name: "Ekonomiskās analīzes departaments", steps: 1512000, participants: 9 },
  { name: "Juridiskais departaments", steps: 1484000, participants: 8 },
  { name: "Administratīvais departaments", steps: 1397000, participants: 10 },
  { name: "Cilvēkresursu attīstības un pārvaldības nodaļa", steps: 1210000, participants: 4 },
  { name: "Komunikācijas nodaļa", steps: 1183000, participants: 3 },
  { name: "Padome", steps: 990000, participants: 2 },
].map(d => ({...d, average: Math.round(d.steps / d.participants)}));

function format(n){ return new Intl.NumberFormat("lv-LV").format(n); }

export default function App(){
  const progress = Math.round((currentSteps / GOAL) * 100);
  const next = checkpoints.find(c => c.steps > currentSteps) || checkpoints[checkpoints.length - 1];
  const reached = checkpoints.filter(c => c.steps <= currentSteps).length;
  const visibleCheckpoints = checkpoints.filter(c => c.steps <= next.steps);
  const embedCode = `<iframe src="https://tava-lapa.lv/progress" width="100%" height="260" style="border:0;" title="Regulatora soļu izaicinājuma progress"></iframe>`;

  return (
    <main>
      <div className="page">
        <nav>
          <div className="brand">
            <div className="logoBox">SPRK</div>
            <div className="logoBox big">25</div>
            <strong>Regulatora jubilejas izaicinājums</strong>
          </div>
          <a className="button" href={submitFormUrl} target="_blank">Iesniegt soļus</a>
        </nav>

        <section className="heroGrid">
          <div className="card hero">
            <p className="eyebrow">25 gadi · 25 miljoni soļu</p>
            <h1>Regulatora soļu izaicinājums</h1>
            <p className="intro">
              🎉 Svinot Regulatora 25 gadu jubileju, aicinām visus regulatora darbiniekus pievienoties kopīgam soļu izaicinājumam — jubilejas gada laikā kopā noiet 25 miljonus soļu! 👣
              <br/><br/>
              25 miljoni izklausās daudz, bet, ja piedalās ap 50 kolēģu, katram gada laikā vidēji jānoiet ap 500 000 soļu — aptuveni 10 000 soļu nedēļā. Soli pa solim tas sakrājas daudz ātrāk, nekā šķiet.
            </p>

            <div className="illustration">
              <span>🏜️</span><span>🌊</span><span>⛰️</span><span>🗼</span><span>🧱</span><span>🌍</span>
            </div>

            <div className="current">
              <h2>👣 Šobrīd esam nogājuši {format(currentSteps)} soļu</h2>
              <p>Mērķis: {format(GOAL)} soļu · {progress}% sasniegti</p>
            </div>

            <div className="progressWrap">
              <div className="progress"><div style={{width: `${progress}%`}} /></div>
              {visibleCheckpoints.map((c, i) => (
                <div className="marker" key={i} style={{left: `${(c.steps/GOAL)*100}%`}}>
                  <span className={c.steps <= currentSteps ? "dot done" : "dot"}></span>
                  <small>{format(c.steps)}</small>
                </div>
              ))}
            </div>

            <div className="checkpointGrid">
              {checkpoints.map(c => {
                const upcoming = c.steps > next.steps;
                const done = c.steps <= currentSteps;
                return (
                  <div className={`checkpoint ${done ? "done" : ""} ${upcoming ? "hiddenCp" : ""}`} key={c.steps}>
                    {upcoming ? <b className="question">?</b> : <><span>{c.icon}</span><b>{format(c.steps)} soļu</b><p>{c.title}</p></>}
                  </div>
                )
              })}
            </div>

            <div className="notice">
              <b>Soļu progress tiek atjaunots reizi nedēļā — pirmdienās</b>
              <p>Aicinām visus darbiniekus iesūtīt savu aktuālo soļu skaitu līdz katras svētdienas beigām.</p>
            </div>

            <div className="actions">
              <a className="button" href={submitFormUrl} target="_blank">Iesniegt savus soļus →</a>
              <a className="button secondary" href="#ka-piedalities">Skatīt noteikumus</a>
            </div>
          </div>

          <aside>
            <div className="card">
              <h3>📍 Nākamais sasniedzamais mērķis</h3>
              <div className="nextIcon">{next.icon}</div>
              <h2>{next.title}</h2>
              <p>Vēl {format(next.steps - currentSteps)} soļi līdz sasniegšanai</p>
            </div>
            <div className="stats">
              <div className="card"><h2>50</h2><p>Piedalās SPRK darbinieku</p></div>
              <div className="card"><h2>{reached}/{checkpoints.length}</h2><p>Sasniegti checkpointi</p></div>
            </div>
          </aside>
        </section>

        <section className="gridTwo">
          <div className="card">
            <h2>Iepriekšējās nedēļas aktīvākie soļotāji</h2>
            {walkers.slice(0,5).map((w,i)=><div className="row" key={w.name}><span>{i+1}. {w.name}</span><b>{format(w.steps)}</b></div>)}
            <div className="ranking">
              <h3>Kopējais staigātāju reitings</h3>
              {walkers.map((w,i)=><div className="row small" key={w.name}><span>{i+1}. {w.name}</span><b>{format(w.steps)}</b></div>)}
            </div>
          </div>

          <div className="card">
            <h2>Nodaļu reitings</h2>
            <p className="muted">Reitings tiek aprēķināts pēc vidējā soļu skaita uz vienu dalībnieku: nodaļas kopējie soļi ÷ nodaļas dalībnieku skaits.</p>
            {departments.sort((a,b)=>b.average-a.average).map((d,i)=>
              <div className="row dept" key={d.name}>
                <span>{i+1}. {d.name}<small>{format(d.steps)} kopā · {d.participants} dalībnieki</small></span>
                <b>{format(d.average)}<small>vidēji</small></b>
              </div>)}
          </div>
        </section>

        <section className="gridTwo">
          <div className="card">
            <h2>Regnet embed kods progress skalai</h2>
            <div className="embedPreview">
              <b>👣 Šobrīd esam nogājuši {format(currentSteps)} soļu</b>
              <div className="progress"><div style={{width: `${progress}%`}} /></div>
              <p>{progress}% no mērķa sasniegti · Mērķis: {format(GOAL)} soļu</p>
              <small>Progress tiek atjaunots pirmdienās. Lūdzu iesūti soļus līdz svētdienas beigām.</small>
            </div>
            <textarea readOnly value={embedCode}></textarea>
          </div>

          <div className="card" id="ka-piedalities">
            <h2>Kā piedalīties un iesniegt savus soļus</h2>
            <div className="steps">
              <div><b>1</b><h3>Atver savu soļu lietotni</h3><p>Apple Health, Samsung Health, Garmin, Fitbit, Google Fit vai citu lietotni.</p></div>
              <div><b>2</b><h3>Uzņem ekrānšāviņu</h3><p>Lai redzams soļu skaits un, ja iespējams, datums vai periods.</p></div>
              <div><b>3</b><h3>Aizpildi anketu</h3><p>Ievadi vārdu, soļu skaitu un pievieno ekrānšāviņu.</p></div>
              <div><b>4</b><h3>Palīdzi sasniegt checkpointus</h3><p>Katrs solis papildina kopējo progresu.</p></div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
