<template>
  <base-section>
    <template #default>

        <div v-if="loading">
          <base-loader />
        </div>
        <div>
          <base-table>
            <template #thead>
                <th class="py-3 px-4 font-bold text-sm text-left">#</th>
                <th class="py-3 px-4 font-bold text-sm text-left">Name</th>
                <th class="py-3 px-4 font-bold text-sm text-left">Leader</th>
                <th class="py-3 px-4 font-bold text-sm text-left">Priority</th>
                <th class="py-3 px-4 font-bold text-sm text-left">Issues</th>
                <th class="py-3 px-4 font-bold text-sm text-left">Tracked</th>
            </template>
            <template #tbody>
              <tbody v-if="filtered.length > 0">
                <tr
                  v-for="(project, index) in filtered"
                  :key="index" 
                  class="dark:border-0  lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                  :class="[index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700']"
                >

                  <td class="py-3 px-4">{{ project.id }}</td>
                  <td class="py-3 px-4"><NuxtLink :to="`/projects/${project.id}`" class=" font-bold text-lg hover:text-blue-600">{{ project.name }}</NuxtLink></td>
                  <td class="py-3 px-4"><span class="text-blue-500 font-semibold">{{ project.leader? project.leader.name : 'n/a' }}</span></td>
                  <td class="py-3 px-4 "><base-priority v-if="project.mapped_priority" :text="project.mapped_priority.toLowerCase()" /></td>
                  <td class="py-3 px-4 "><span class="font-semibold">{{ project.issues_count }}</span></td>
                  <td class="py-3 px-4 "><base-hours :hours="project.total_spent" variant="duration"  class="font-semibold " /></td>
                </tr>
              </tbody>

               <tbody v-if="filtered.length < 1">
                <tr class="dark:border-0  lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500">
                  <td colspan="6">
                    <base-iddle title="Not Found!" class="my-6" />
                  </td>
                </tr>
              </tbody>

            </template>
            <template #tfoot>
              <tfoot class="border-gray-100 p-3 lg:px-6 border-t dark:border-gray-800">
                <tr>
                  <td colspan="6">
                       <div class="flex w-full box-border pt-4 items-center">

                          <div class="flex">
                          
                            <button
                              v-for="(link, index) in links"
                              :key="index"
                              class="inline-flex cursor-pointer justify-center items-center whitespace-nowrap outline-none transition-colors 
                                duration-150 border rounded p-1 bg-white text-black border-gray-300 mr-3 
                                hover:bg-blue-700 hover:text-white hover:border-blue-700 
                                disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-default
                                last:mr-0 mb-3"
                              :class="link.active ? 'border-blue-600 bg-blue-600 text-white': '' "
                              type="button"
                              :disabled="!link.url ? true: false"
                              @click.stop="paginationHandle(link.url)"
                            > 
                              <span class="px-2" :class="link.active ? 'text-white hover:text-white': '' " v-html="link.label"></span>
                            </button>

                          </div>

                          <div class="ml-auto">
                            <div>
                              <span class="text-slate-400 text-sm uppercase mr-2 font-bold">Total Records:</span>
                              <span class="font-bold text-blue-700 text-xl">{{ total }}</span>
                            </div>
                          </div>
                        </div>
                  </td>
                </tr>
              </tfoot>
             
            </template>
          </base-table>
        
          
        
        </div>
    </template>
  </base-section>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useProjectsStore } from '@/store/projects'
  const projects = useProjectsStore()
  const { loading, filtered, links, total } = storeToRefs(projects)
  const { fetchAPI } = useProjects()

  const paginationHandle = (url:string | null | undefined) => {
    if (url && url !=='') {
      fetchAPI(url)
    }
  }
  
</script>


