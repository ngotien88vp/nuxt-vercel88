<template>
  <div class="project-detail">

      <div v-if="loading">
        <base-loader />
      </div>

      <div v-else>

        <div v-if="project" class="py-10">

          <div class="mb-4">
            <h2 v-if="project.name" class="text-4xl font-bold mb-4 ">{{ project.name }}</h2>
            <div class="w">
              <div class="w-2/3 desc">
               <base-section-block title="Description">
                  <template #content>
                    {{ project.description }}
                  </template>
                </base-section-block>

              </div>
            </div>
          </div>

          <div class="grid grid-cols-12 gap-4 mt-10">
    
            <div class="mb-4 md:col-span-2">
              <base-section-block title="Client">
                <template #content>
                  <span class="block font-bold text-xl">{{ project.client ? project.client : 'n/a'}}</span>
                </template>
              </base-section-block>
            </div>

            <div class="mb-4 md:col-span-2">
              <span class="block text-sm"></span> 
             

              <base-section-block title="Project Leader">
                <template #content>
                  <span class="block font-bold text-xl">{{ project?.leader ? project.leader.name : 'n/a'}}</span>
                </template>
              </base-section-block>

            </div>

            <!-- <div class="mb-4 md:col-span-2">
               <base-section-block title="Date Created">
                <template #content>
                   <span class="block font-bold text-xl">{{ project?.created_at }}</span>
                </template>
              </base-section-block>
            </div> -->


            <div class="mb-4 md:col-span-2">
             <base-section-block title="Priority">
                <template #content>
                  <base-priority v-if="project" :text="project.mapped_priority.toString()" />
                </template>
              </base-section-block>
            </div>

            <div class="mb-4 md:col-span-2">
             <base-section-block title="Status">
                <template #content>
                   <base-priority v-if="project" :text='project.mapped_status!.name.toLowerCase()' />
                </template>
              </base-section-block>
            </div>

          </div>
        </div>
    
<!-- 
        <div  v-if="project" class="mt-4">

          <div class="grid grid-cols-12 gap-4">
          
            <div class="md:col-span-2">
              <base-stats
                title="Total Issues" 
                class="col-1"
              >
                <template #display>{{ project.total_issue }}</template>
              </base-stats>
            </div>

            <div class="md:col-span-2">
              <base-stats
                title="Total Active Issues" 
                class="col-1"
              >
                <template #display>{{ project.total_active_issue }}</template>
              </base-stats>
            </div>

            <div class="md:col-span-2">
              <base-stats 
                title="Tracked" 
                class="col-1">
               <template #display>{{ projectTracked }}</template>
              </base-stats>
            </div>

            <div class="md:col-span-2">
              <base-stats 
                :number="9" 
                title="Members" 
                class="col-1"
              >
                <template #display>9</template>
              </base-stats>
            </div>

          </div>
          
        </div> -->

        <div v-if="project" class="mt-10">
          <tasks-filter-bar :pid="route.params.id"  />

          <tasks-project-listing
            :listing="filteredTasks" 
            :pid="route.params.id" 
            :pname="project.name" 
            :total="project.total_issue"
          />
        </div>

      </div>
  </div>
</template>

<script setup lang="ts">

  import { storeToRefs } from 'pinia'
  import { useProjectStore } from '~~/store/project'

  const route = useRoute()
  const projectStore = useProjectStore()
  const { filteredTasks, project, loading } = storeToRefs(projectStore)
  const { fetch } = useProject()
  // const { formatDuration } = useUTILs()

  // const projectTracked = computed(() => {
  //   return formatDuration(tracked.value)
  // })

  onMounted(() => {
    if ( !route.params.id ) navigateTo('/projects');
    fetch(route.params.id.toString())
  })

  onUnmounted(() => {
    projectStore.$reset()
  })
  
</script>
<style lang="scss" scoped>
  .loadingState {
    display: none;
  }

  .desc {
    pre {
      overflow: auto;
    }
  }
</style>