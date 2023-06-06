import React, { useEffect } from 'react';
import { themeChange } from 'theme-change';

const Settings: React.FC = () => {

  useEffect(() => {
    themeChange(false);
  });

  return (
    <main className="max-w-full min-h-screen bg-neutral flex-1 place-content-center p-40">
      <h2 className="text-neutral-content text-3xl">Choose your weapon!... I mean theme</h2>
      <button data-set-theme="light" data-act-class="ACTIVECLASS" className="btn m-4">Light</button>
      <button data-set-theme="dark" data-act-class="ACTIVECLASS" className="btn m-4">Dark</button>
      <button data-set-theme="cupcake" data-act-class="ACTIVECLASS" className="btn m-4">Cupcake</button>
      <button data-set-theme="bumblebee" data-act-class="ACTIVECLASS" className="btn m-4">Bumblebee</button>
      <button data-set-theme="emerald" data-act-class="ACTIVECLASS" className="btn m-4">Emerald</button>
      <button data-set-theme="corporate" data-act-class="ACTIVECLASS" className="btn m-4">Corporate</button>
      <button data-set-theme="synthwave" data-act-class="ACTIVECLASS" className="btn m-4">Synthwave</button>
      <button data-set-theme="retro" data-act-class="ACTIVECLASS" className="btn m-4">Retro</button>
      <button data-set-theme="cyberpunk" data-act-class="ACTIVECLASS" className="btn m-4">Cyberpunk</button>
      <button data-set-theme="valentine" data-act-class="ACTIVECLASS" className="btn m-4">Valentine</button>
      <button data-set-theme="halloween" data-act-class="ACTIVECLASS" className="btn m-4">Halloween</button>
      <button data-set-theme="garden" data-act-class="ACTIVECLASS" className="btn m-4">Garden</button>
      <button data-set-theme="forest" data-act-class="ACTIVECLASS" className="btn m-4">Forest</button>
      <button data-set-theme="aqua" data-act-class="ACTIVECLASS" className="btn m-4">Aqua</button>
      <button data-set-theme="lofi" data-act-class="ACTIVECLASS" className="btn m-4">Lo-Fi</button>
      <button data-set-theme="pastel" data-act-class="ACTIVECLASS" className="btn m-4">Pastel</button>
      <button data-set-theme="fantasy" data-act-class="ACTIVECLASS" className="btn m-4">Fantasy</button>
      <button data-set-theme="wireframe" data-act-class="ACTIVECLASS" className="btn m-4">Wireframe</button>
      <button data-set-theme="black" data-act-class="ACTIVECLASS" className="btn m-4">Black</button>
      <button data-set-theme="luxury" data-act-class="ACTIVECLASS" className="btn m-4">Luxury</button>
      <button data-set-theme="dracula" data-act-class="ACTIVECLASS" className="btn m-4">Dracula</button>
      <button data-set-theme="cmyk" data-act-class="ACTIVECLASS" className="btn m-4">CMYK</button>
      <button data-set-theme="autumn" data-act-class="ACTIVECLASS" className="btn m-4">Autumn</button>
      <button data-set-theme="business" data-act-class="ACTIVECLASS" className="btn m-4">Business</button>
      <button data-set-theme="acid" data-act-class="ACTIVECLASS" className="btn m-4">Acid</button>
      <button data-set-theme="lemonade" data-act-class="ACTIVECLASS" className="btn m-4">Lemonade</button>
      <button data-set-theme="night" data-act-class="ACTIVECLASS" className="btn m-4">Night</button>
      <button data-set-theme="coffee" data-act-class="ACTIVECLASS" className="btn m-4">Coffee</button>
      <button data-set-theme="winter" data-act-class="ACTIVECLASS" className="btn m-4">Winter</button>
    </main>
  );
};

export default Settings;
