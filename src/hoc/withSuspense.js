import { Suspense } from "react"
import { Preloader } from "../components/common/Preloader/Preloader"

export const withSuspenseHOC = (Component) => {
    return (props) => {
        <div>
            <Suspense fallback={<Preloader />}>
                <Component {...props} />
            </Suspense>
        </div>
    }
}