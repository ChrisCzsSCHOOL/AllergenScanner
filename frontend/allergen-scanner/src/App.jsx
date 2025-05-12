import { useSymbologyScanner } from '@use-symbology-scanner/react';

export const App = () => {
    const ref = useRef(null)

    const handleSymbol = (symbol, matchedSymbologies) => {
        console.log(`Scanned ${symbol}`)
    }

    useSymbologyScanner(handleSymbol, { target: ref })

    return (
        <div ref={ref}>
        </div>
    )
}