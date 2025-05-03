'use client'

import { useIsomorphicLayoutEffect } from "@/components/hooks/use-isomorphic-layout-effect"

import { Button, Card, CardBody } from "@heroui/react"
import { useState, useEffect } from "react"
import { LayoutGrid, Layers, RefreshCw, ArrowRight } from "lucide-react"

export default function UseIsomorphicLayoutEffectDemoPage() {
  const [count, setCount] = useState(0)
  const [layoutCount, setLayoutCount] = useState(0)
  const [effectLog, setEffectLog] = useState<string[]>([])

  useEffect(() => {
    if (count > 0) {
      setEffectLog(prev => [`useEffect executed (${count})`, ...prev.slice(0, 4)])
    }
  }, [count])

  useIsomorphicLayoutEffect(() => {
    if (layoutCount > 0) {
      setEffectLog(prev => [`useIsomorphicLayoutEffect executed (${layoutCount})`, ...prev.slice(0, 4)])
    }
  }, [layoutCount])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">useIsomorphicLayoutEffect Demo (HeroUI)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Left Column - Interactive Demo */}
        <Card>
          <CardBody className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Interactive Demo</h3>
                <p className="text-sm text-foreground-500">
                  Compare useEffect vs useIsomorphicLayoutEffect
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">useEffect</span>
                  </div>
                  <Button 
                    variant="bordered"
                    onPress={() => setCount(c => c + 1)}
                    className="w-full"
                    color="primary"
                  >
                    Trigger useEffect ({count})
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">useIsomorphicLayoutEffect</span>
                  </div>
                  <Button 
                    variant="bordered"
                    onPress={() => setLayoutCount(c => c + 1)}
                    className="w-full"
                    color="success"
                  >
                    Trigger Layout ({layoutCount})
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Execution Log:</div>
                <div className="bg-default-100 rounded-lg p-3 space-y-1 min-h-[120px]">
                  {effectLog.map((log, index) => (
                    <div key={index} className="text-xs flex items-center gap-2">
                      <ArrowRight className="w-3 h-3" />
                      {log}
                    </div>
                  ))}
                  {effectLog.length === 0 && (
                    <div className="text-xs text-foreground-400">
                      Click buttons above to see effects execution
                    </div>
                  )}
                </div>
              </div>

              <Button 
                variant="flat"
                onPress={() => {
                  setCount(0)
                  setLayoutCount(0)
                  setEffectLog([])
                }}
                className="w-full"
                color="default"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Demo
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Right Column - Documentation */}
        <Card>
          <CardBody className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">About the Hook</h3>
                <p className="text-sm text-foreground-500">
                  useIsomorphicLayoutEffect automatically uses the appropriate effect hook based on the environment:
                </p>
              </div>

              <div className="space-y-4">
                <pre className="bg-default-100 text-default-800 p-3 rounded-md text-xs overflow-x-auto">
{`// Hook implementation
export const useIsomorphicLayoutEffect =\n  typeof window !== "undefined" \n    ? React.useLayoutEffect \n    : React.useEffect`}
                </pre>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-medium">Browser</h4>
                    <div className="p-3 rounded-md bg-default-50">
                      Uses <code className="text-xs font-mono">useLayoutEffect</code>
                      <p className="text-xs text-foreground-500 mt-1">
                        Runs synchronously after DOM mutations
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Server (SSR)</h4>
                    <div className="p-3 rounded-md bg-default-50">
                      Uses <code className="text-xs font-mono">useEffect</code>
                      <p className="text-xs text-foreground-500 mt-1">
                        Avoids SSR warnings
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Use Cases</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground-500">
                    <li>DOM measurements</li>
                    <li>DOM mutations that need to be sync</li>
                    <li>Tooltips positioning</li>
                    <li>Cross-environment compatibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
} 