
import CityDropdown from "../header/CityDropdown"
import SearchInput from "../header/SearchInput"
import ToggleTheme from "../header/ToggleTheme"

export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full gap-4">
      <CityDropdown />
      <SearchInput />
      <ToggleTheme />
    </header>
  )
}