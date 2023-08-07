import { VComfyNode } from "#components"

const Page = defineComponent({
  setup() {
    return () => (
      <div class="w-full px-5 pb-5 sm:px-40 sm:pt-10">
        <div class="flex w-full flex-col sm:flex-row">
          <VComfyNode />
        </div>
      </div>
    )
  },
})

export default Page
