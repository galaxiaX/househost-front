import PerksInfo from "./PerksInfo";

export default function Offers({ place }) {
  return (
    <div className="w-full pb-6 flex flex-col gap-4 border-b">
      <h2 className="text-2xl font-semibold">What this place offers</h2>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2">
        {place.perks?.map((perk) => (
          <div
            key={perk}
            className="border p-2 flex items-center gap-2 rounded-lg"
          >
            {perk === PerksInfo.breakfast.name && <PerksInfo.breakfast.svg />}
            {perk === PerksInfo.wifi.name && <PerksInfo.wifi.svg />}
            {perk === PerksInfo.parking.name && <PerksInfo.parking.svg />}
            {perk === PerksInfo.tv.name && <PerksInfo.tv.svg />}
            {perk === PerksInfo.pets.name && <PerksInfo.pets.svg />}
            {perk === PerksInfo.gym.name && <PerksInfo.gym.svg />}
            {perk === PerksInfo.air.name && <PerksInfo.air.svg />}
            {perk === PerksInfo.pool.name && <PerksInfo.pool.svg />}
            {perk === PerksInfo.kitchen.name && <PerksInfo.kitchen.svg />}

            <span>{PerksInfo[perk].text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
