import PerksInfo from "./PerksInfo";
export default function Perks({ newPlace, setNewPlace }) {
  function handleCheckboxClick(ev) {
    const { checked, name } = ev.target;
    let updatedSelected;
    if (checked) {
      updatedSelected = [...newPlace.perks, name];
    } else {
      updatedSelected = newPlace.perks.filter(
        (selectedName) => selectedName !== name
      );
    }
    setNewPlace((prevState) => ({
      ...prevState,
      ["perks"]: updatedSelected,
    }));
  }

  return (
    <>
      <label className="border p-2 flex items-center gap-2 rounded-lg">
        <input
          type="checkbox"
          checked={newPlace.perks.includes("breakfast")}
          name="breakfast"
          onChange={handleCheckboxClick}
        />
        <PerksInfo.breakfast.svg />
        <span>{PerksInfo.breakfast.text}</span>
      </label>

      <label className="border p-2 flex items-center gap-2 rounded-lg">
        <input
          type="checkbox"
          checked={newPlace.perks.includes("wifi")}
          name="wifi"
          onChange={handleCheckboxClick}
        />
        <PerksInfo.wifi.svg />
        <span>{PerksInfo.wifi.text}</span>
      </label>

      <label className="border p-2 flex items-center gap-2 rounded-lg">
        <input
          type="checkbox"
          checked={newPlace.perks.includes("parking")}
          name="parking"
          onChange={handleCheckboxClick}
        />
        <PerksInfo.parking.svg />
        <span>{PerksInfo.parking.text}</span>
      </label>

      <label className="border p-2 flex items-center gap-2 rounded-lg">
        <input
          type="checkbox"
          checked={newPlace.perks.includes("tv")}
          name="tv"
          onChange={handleCheckboxClick}
        />
        <PerksInfo.tv.svg />
        <span>{PerksInfo.tv.text}</span>
      </label>

      <label className="border p-2 flex items-center gap-2 rounded-lg">
        <input
          type="checkbox"
          checked={newPlace.perks.includes("pets")}
          name="pets"
          onChange={handleCheckboxClick}
        />
        <PerksInfo.pets.svg />
        <span>{PerksInfo.pets.text}</span>
      </label>

      <label className="border p-2 flex items-center gap-2 rounded-lg">
        <input
          type="checkbox"
          checked={newPlace.perks.includes("gym")}
          name="gym"
          onChange={handleCheckboxClick}
        />
        <PerksInfo.gym.svg />
        <span>{PerksInfo.gym.text}</span>
      </label>

      <label className="border p-2 flex items-center gap-2 rounded-lg">
        <input
          type="checkbox"
          checked={newPlace.perks.includes("air")}
          name="air"
          onChange={handleCheckboxClick}
        />
        <PerksInfo.air.svg />
        <span>{PerksInfo.air.text}</span>
      </label>

      <label className="border p-2 flex items-center gap-2 rounded-lg">
        <input
          type="checkbox"
          checked={newPlace.perks.includes("pool")}
          name="pool"
          onChange={handleCheckboxClick}
        />

        <PerksInfo.pool.svg />
        <span>{PerksInfo.pool.text}</span>
      </label>

      <label className="border p-2 flex items-center gap-2 rounded-lg">
        <input
          type="checkbox"
          checked={newPlace.perks.includes("kitchen")}
          name="kitchen"
          onChange={handleCheckboxClick}
        />
        <PerksInfo.kitchen.svg />
        <span>{PerksInfo.kitchen.text}</span>
      </label>
    </>
  );
}
