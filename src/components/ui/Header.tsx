import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Container from "../modules/Container";
import Switch from "../modules/Switch";
import { toggleRole } from "../../state/features/user/userSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.user.role);
  const handleSwitchChange = () => {
    dispatch(toggleRole());
  };
  return (
    <header className="py-3">
      <Container className="flex justify-end gap-5">
        <div className="flex gap-3">
          Admin{" "}
          <Switch
            checked={role === "user"}
            onChange={() => {
              handleSwitchChange();
            }}
            label="User"
          />{" "}
        </div>
        <button>
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Container>
    </header>
  );
}
