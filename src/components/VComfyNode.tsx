import { Handle } from "@vue-flow/core"

import * as nodesSchema from "../mock_object_info.json"
import { NButton, NFormItem, NH1, NH3, NH5, NInput, NInputNumber, NPopover, NSelect } from "naive-ui"
import { Popover } from "@headlessui/vue"

type TComfyUINodeInput = {
  required: {
    [key: string]: any
  }
}

type TComfyUINode = {
  input: TComfyUINodeInput
  output: ["MODEL", "CLIP", "VAE"]
  output_is_list: [boolean, boolean, boolean]
  output_name: ["MODEL", "CLIP", "VAE"]
  name: string
  display_name: string
  description: string
  category: string
  output_node: boolean
}

function simpleZip(a, b) {
  return a.map((element, index) => {
    return [element, b[index]]
  })
}

const VComfyNode = defineComponent({
  props: ["data"],
  setup({ data }) {
    const node = data
    const schema = nodesSchema[node.type] as TComfyUINode
    const s = []
    for (const [key, value] of Object.entries(schema?.input?.required || {})) {
      s.push({
        label: key,
        type: value[0],
        config: value[1],
      })
      console.log(value[0])
    }
    // console.log(toRaw(schema), s)
    return () => (
      <>
        {/*<h1>{node.id + ":" + (node.title || "") + "-" + node.type}</h1>*/}
        {node.title && (
          <NH5>
            {node.id} - {node.title}
          </NH5>
        )}
        <div
          class={{
            "flex w-full columns-2 text-xs": true,
            "justify-center": !node.title,
          }}
        >
          <div class={"w-full text-left"}>
            {(data.inputs || []).map((ip, index) => {
              return (
                <div class="relative">
                  <span class="pl-1">{ip.name}</span>
                  <Handle id={ip.link} type="target" position={"left"} />
                </div>
              )
            })}
          </div>
          <div class={"w-full text-right"}>
            {(data.outputs || []).map((ip, index) => {
              return (
                <div class="relative">
                  <span class="pr-1">{ip.name}</span>
                  <Handle id={ip.slot_index} type="source" position={"right"} />
                </div>
              )
            })}
          </div>
        </div>
        <div
          class={"w-full"}
          style={{
            fontSize: "10px",
          }}
        >
          {simpleZip(data.widgets_values || [], s || []).map((a) => {
            if (!a[1]?.label) {
              return (
                <div class={"flex"}>
                  <NInput type="textarea" size={"small"} autosize={{ minRows: 1, maxRows: 50 }} rows={1} value={a[0]} />
                </div>
              )
            }
            return (
              <div class={"flex columns-4"}>
                {/*<span class={"w-[70px] overflow-auto text-ellipsis"}>{a[1]?.type || ""}</span>*/}
                {/*<span class={"w-[70px] overflow-auto text-ellipsis"}>{a[1]?.config?.default || ""}</span>*/}
                <span class="w-[70px] max-w-[70px] overflow-hidden text-ellipsis text-sm">{a[1]?.label}</span>
                {a[1].type === "INT" && <NInputNumber size={"small"} value={a[0]} />}
                {a[1].type === "FLOAT" && <NInputNumber size={"small"} value={a[0]} />}
                {a[1].type === "STRING" && <NInput size={"small"} value={a[0]} />}
                {Array.isArray(a[1].type) && (
                  <NSelect
                    size={"small"}
                    options={a[1].type.map((i) => {
                      return { label: i, value: i }
                    })}
                  />
                )}
              </div>
            )
          })}
        </div>
      </>
    )
  },
})

export default VComfyNode
// {/*<NPopover trigger="hover">*/}
// {/*  {{*/}
// {/*    trigger: () => <NButton>悬浮</NButton>,*/}
// {/*  }}*/}
// {/*  <span>或许不想知道你的花园长得咋样</span>*/}
// {/*</NPopover>*/}
