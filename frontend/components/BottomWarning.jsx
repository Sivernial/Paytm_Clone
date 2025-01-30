import { Link } from "react-router-dom";

export function BottomWarning({label,buttonText,to}) {
    return <div className="py-2 text-sm flex justify-center">
            <div>
                {label}
            </div>
            <div>
            <Link to={to} className="text-sm text-blue-500">
                {buttonText}
            </Link>
        </div>
    </div>
}