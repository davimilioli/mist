import { Spinner } from "./ui/spinner"
import { LoaderIcon } from "lucide-react"

type Props = {
    size: number;
}

const LoadingSpinner = ( {size}: Props ) => {
    return (
        <Spinner className={`size-${size}`}>
            <LoaderIcon />
        </Spinner>
    )
}

export default LoadingSpinner;