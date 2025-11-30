import { Button } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import { Settings } from "~/pages/main/settings";
import LogoImage from "~/assets/logo.svg";
import { useAtom } from "jotai";
import { userAtom } from "~/store/global";

export const Index = () => {
    const navigate = useNavigate();
    const [, setUser] = useAtom(userAtom);
    const go = () => {
        setUser({ email: "user@example.com", name: "User", admin: true });
        navigate("/");
    };

    return (
        <div className="w-full h-screen flex justify-center items-center text-white bg-center bg-cover">
            <div>
                <div className="flex justify-center items-center gap-2">
                    <img src={LogoImage} />
                    <span className="text-primary text-center font-bold text-32px">Dev Tools</span>
                </div>
                <div className="text-center">
                    <Button type="outline" onClick={go} className="mt-100px w-150px">
                        Start
                    </Button>
                </div>
            </div>
            <Settings className="absolute top-4 right-4" />
        </div>
    );
};
