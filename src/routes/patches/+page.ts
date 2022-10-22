import type { Patch } from '$lib/types';

export type Output = { patches: Patch[], packages: string[] };

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function load({
  fetch
}): Output {
  const response = await fetch('https://releases.rvcd.win/patches');
  const json = await response.json();

  let pkg_list = [];

  // yes
  for (let i = 0; i < json.length; i++) {
    json[i].compatiblePackages.forEach(pkg => {
      let index = pkg_list.findIndex(x => x == pkg.name);
      if (index === -1) {
        pkg_list.push(pkg.name);
      };
    });
  };
  await sleep(3000);

  return { patches: json, packages: pkg_list };
}
