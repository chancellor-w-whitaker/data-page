import { useClickOutsideCondensed } from "../hooks/useClickOutside";

const submitSearch = (e) => {
  e.preventDefault();
  const query = e.target[0];
  const web = e.target[1];
  const domain = web.checked
    ? "https://www.eku.edu/search/?q="
    : "https://tools.eku.edu/people-search?search_by=f&advanced=1&search=Search&area=&search_name=";
  const location = domain + query.value;
  window.open(location, "_blank");
};

export const SearchBar = () => {
  const [isOpen, open, insideRef] = useClickOutsideCondensed();

  return (
    <>
      <form
        className="ms-lg-3 d-flex position-relative"
        onSubmit={submitSearch}
        ref={insideRef}
        role="search"
      >
        <input
          className="form-control header-search fs-5"
          placeholder="Search Eastern"
          aria-label="Search"
          autoComplete="off"
          onClick={open}
          type="search"
        />
        <div className={"radio-popover w-100 z-3" + (isOpen ? "" : " d-none")}>
          <ul className="list-group">
            <li className="list-group-item">
              <input
                className="form-check-input me-1"
                name="listGroupRadio"
                id="firstRadio"
                defaultChecked
                type="radio"
                value="web"
              />
              <label
                className="form-check-label stretched-link"
                htmlFor="firstRadio"
              >
                Web
              </label>
            </li>
            <li className="list-group-item">
              <input
                className="form-check-input me-1"
                name="listGroupRadio"
                id="secondRadio"
                value="radio"
                type="radio"
              />
              <label
                className="form-check-label stretched-link"
                htmlFor="secondRadio"
              >
                People
              </label>
            </li>
          </ul>
        </div>
      </form>
    </>
  );
};
