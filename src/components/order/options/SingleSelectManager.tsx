import { useState } from "react";
import SingleSelectButton from "./SingleSelectButton";

export default function SingleSelectManager() {
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    return (
        <div className="flex flex-row">
            <SingleSelectButton 
        </div>
    )
}