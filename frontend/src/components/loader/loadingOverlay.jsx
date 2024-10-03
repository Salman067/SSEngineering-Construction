import { useIsFetching, useIsMutating } from "@tanstack/react-query";

import loadingSvg from "../../assets/loading.svg";

const LoadingOverlay = () => {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();

    const skipLoading = useIsFetching({ queryKey: ['skipLoading'] });

    if (!isFetching && !isMutating) {
        return null;
    }
    if (skipLoading) {
        return null;
    }
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <object
                type="image/svg+xml"
                data={loadingSvg}
                className="max-w-sm w-48"
            />
            {/* <span className="text-2xl text-primary text-primaryLighter -mt-10">Loading</span> */}
        </div>
    );
};

export default LoadingOverlay;