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
  const navigate = useNavigate();

  const displayName = user?.names?.[0]?.displayName || "User";
  const email = user?.emailAddresses?.[0]?.value || "No email";
  const photoUrl = user?.photos?.[0]?.url || null;

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
          <AvatarImage src={photoUrl} alt={displayName} />
          <AvatarFallback>{displayName?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem disabled className="text-gray-500">
          {displayName}
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="text-gray-500">
          {email}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
