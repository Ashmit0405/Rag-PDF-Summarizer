import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/context/authContext.jsx";

export default function ProfileCard() {
  const { logout, user } = useContext(AuthContext);
  console.log(user)
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/sign-up");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.image} alt={user?.username} />
          <AvatarFallback>{user?.username?.[0] ?? "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled className="text-gray-500">
          {user?.email}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
