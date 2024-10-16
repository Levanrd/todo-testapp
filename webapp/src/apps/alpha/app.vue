<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >

    </v-navigation-drawer>

    <v-app-bar class="blue-grey lighten-4" flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout" color="primary">Logout</v-btn>
    </v-app-bar>

    <div>
      <v-tabs v-model="activeTab" class="tabs">
        <v-tab>Tasks</v-tab>
        <v-tab>Test A</v-tab>
        <v-tab>Test B</v-tab>

        <v-tab-item>
          <div>
            <v-row>
              <v-col>
                <v-data-table
                  :loading="loading"
                  loading-text="Loading... Please wait"
                  :headers="headers"
                  :items="tasks"
                  class="elevation-1 custom-data-table"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-btn class="mr-1 pa-3" outlined x-small rounded @click="showAddTaskModal">Add Task</v-btn>
                      <v-btn class="mr-1 pa-3" outlined x-small rounded @click=""><v-icon left>mdi-export</v-icon>Export</v-btn>
                      <v-btn class="mr-1 pa-3" outlined x-small rounded @click="">Bulk Update</v-btn>
                      <v-btn class="mr-1 pa-3" outlined x-small rounded @click="">Bulk Delete</v-btn>
                    </v-toolbar>
                  </template>

                  <template v-slot:item.index="{ index }">
                    <span>{{ index + 1 }}</span>
                  </template>

                  <template v-slot:item.title="{ item }">
                    <span>{{ `Task #${item._id} ${item.title}` }}</span>
                  </template>

                  <template v-slot:item.completed="{ item }">
                    <v-chip small :color="item.completed ? 'green' : 'red'" dark>
                      {{ item.completed ? 'Completed' : 'Pending' }}
                    </v-chip>
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <v-btn class="mr-1" x-small icon @click="showViewTaskModal(item)">
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    <v-btn class="mr-1" x-small icon @click="deleteTask(item._id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </div>
        </v-tab-item>

        <v-tab-item>
          <div>
            <v-row>
              <v-col>
                <!-- Add content for Test A here -->
              </v-col>
            </v-row>
          </div>
        </v-tab-item>

        <v-tab-item>
          <div>
            <v-row>
              <v-col>
                <!-- Add content for Test B here -->
              </v-col>
            </v-row>
          </div>
        </v-tab-item>

      </v-tabs>
    </div>

    <!-- Add/Edit Task Modal -->
    <v-dialog v-model="taskModal" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ isEditMode ? 'Edit Task' : 'Add Task' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="task.title" label="Title" required></v-text-field>
            <v-textarea v-model="task.description" label="Description" required></v-textarea>
            <v-select
              class="text-capitalize"
              v-model="task.priority"
              :items="['low', 'medium', 'high']"
              label="Priority"
              required
            ></v-select>
            <v-menu
              ref="dueDateMenu"
              v-model="dueDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="localDueDate"
                  label="Due Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="task.dueDate" 
                @input="updateLocalDueDate"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeTaskModal">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveTask">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- View Task Modal -->
    <v-dialog v-model="viewTaskModal" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">View Task</span>
          <v-spacer></v-spacer>
          <v-chip class="text-capitalize" >Priority: {{ task.priority }}</v-chip>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="task.title" label="Title" readonly></v-text-field>
          <v-textarea v-model="task.description" label="Description" readonly></v-textarea>
          <v-text-field :value="formatDueDate(task.dueDate)" label="Due Date" readonly></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeViewTaskModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script src="./script.js"></script>

<style lang="scss">
@import "./style.scss";
</style>