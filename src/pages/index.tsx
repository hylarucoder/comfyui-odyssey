import { VueFlow } from "@vue-flow/core"

import * as nodes from "../mock_workflow.json"
import { ClientOnly, VComfyNode } from "#components"
import { Background } from "@vue-flow/background"
import { Controls } from "@vue-flow/controls"
import { MiniMap } from "@vue-flow/minimap"

const newNodes = nodes.nodes.map((node) => {
  return {
    id: node.id.toString(),
    label: node.id + ":" + (node.title || "") + "-" + node.type,
    position: {
      x: node.pos[0],
      y: node.pos[1],
    },
    type: "custom",
    data: node,
    style: {
      width: node.size["0"] + "px",
      // height: node.size["1"] + "px",
    },
    sourcePosition: "right",
    targetPosition: "left",
  }
})

for (const link of nodes.links) {
  const f = link[1].toString() + ":" + link[0].toString()
  const t = link[3].toString() + ":" + link[2].toString()
  newNodes.push({
    id: "e1-2-" + link[0] + link[2],
    // label: link[5] + "f:" + `lk(${f})->(${t}) : ${link[4]}`,
    label: link[5] || "",
    source: link[1].toString(),
    sourceHandle: link[2].toString(),
    target: link[3].toString(),
    targetHandle: link[0].toString(),
    animated: true,
  })
}

console.log(newNodes)

const Page = defineComponent({
  setup(props, { slots }) {
    const { t } = useTrans()
    const elements = ref(newNodes)
    return () => (
      <ClientOnly>
        <div
          style={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <VueFlow fitViewOnInit style="height:100%; width:100%;" class="h-full w-full" modelValue={elements}>
            {{
              "node-custom": ({ data }: { data: any }) => <VComfyNode data={data} />,
              default: () => (
                <>
                  <Background patternColor="#aaa" gap={8} />
                  <MiniMap />
                  <Controls />
                </>
              ),
            }}
          </VueFlow>
        </div>
      </ClientOnly>
    )
  },
})

export default Page
