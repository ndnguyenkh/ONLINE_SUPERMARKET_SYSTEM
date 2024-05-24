
import { forwardRef, useState } from "react";

import Images from "~/utils/Images";

const Image = forwardRef(({ style, src, alt, ...props }, ref) => {

    const [fallBack, setFallBack] = useState("");

    const handleError = () => {
        setFallBack(
            Images.noImage
        )
    }

    return ( 
        <img 
            style={{ overflow: "hidden", ...style }}
            // className={classNames(styles.wrapper, className)} 
            src={fallBack || src} 
            ref={ref} 
            {...props} 
            alt={alt} 
            onError={handleError} 
        />
     );
});

export default Image;