
import CityDropdown from "../header/CityDropdown"
import RefreshButton from "../header/RefreshButton";
import SearchInput from "../header/SearchInput"
import ToggleTheme from "../header/ToggleTheme"

type Props = {
  city?: string;
}

export const Header = ({ city }: Props) => {
  return (
    <header className="flex items-center justify-between w-full gap-4">
      <CityDropdown />
      <SearchInput />
      {city && <RefreshButton city={city} />}
      <ToggleTheme />
    </header>
  )
}