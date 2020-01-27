<template>
	<div align="center">
		<!-- If file was already parsed don't render this section -->
		<template v-if="!IsParsed">
			<h4>Chose a csv file and edit it!</h4>
			<form action="#" method="post" enctype="multipart/form-data">
				<div>
					<!-- check if csv file was selected, if yes load it -->
					<input
						type="file"
						name="uploaded-file"
						accept=".csv"
						style="border: 1px solid black"
						@change="LoadCSV($event)"
						required
					/>
					<div>
						<!-- Ask if the file contains headers -->
						<input
							type="checkbox"
							id="HasHeaders"
							@change="CheckHeaders"
							checked
						/>
						<label for="HasHeaders">Has Headers?</label>
					</div>
				</div>
			</form>
			<!-- Parse file -->
			<button
				class="btn btn-primary"
				@click="ParseFile(LoadedFile, ParsedFile)"
			>
				Parse CSV
			</button>
		</template>
		<template v-else>
			<h4>
				Now change the data, delete or add columns!<br />When it's done,
				click the Save button to save your file in JSON format
			</h4>
			<div class="table-responsive">
				<table class="table-sm table-striped table-hover text-center">
					<thead>
						<tr>
							<!-- Iterate through the Header variable and render it -->
							<th
								v-for="(header, index) in Headers"
								:key="index"
								scope="col"
							>
								<input
									class="text-center"
									type="text"
									v-model="Headers[index]"
								/>
								<!-- click button to delete the column -->
								<button
									type="button"
									class="close float-left"
									style="margin-left: 2em"
									aria-label="Close"
									@click="DeleteColumn(header)"
								>
									<span aria-hidden="true">&#8722;</span>
								</button>
								<!-- Click button to add a new column -->
								<button
									type="button"
									class="close pull-left"
									style="margin-right: 2em"
									aria-label="Close"
									@click="AddColumn(header)"
								>
									<span aria-hidden="true">&#43;</span>
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						<!-- Iterate though the elements and then through the data of the Parsed File and render them -->
						<tr v-for="(data, index) in ParsedFile" :key="index">
							<td v-for="(element, i) in data" :key="i">
								<input
									class="text-center"
									type="text"
									v-model="ParsedFile[index][i]"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- On click elaborate the parsed file and save it in JSON format -->
			<button
				type="submit"
				class="btn btn-success"
				@click="SaveJSON(JSONFile)"
			>
				Save
			</button>
		</template>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data: () => {
		return {
			// Initialize the useful variables
			HasHeaders: true,
			JSONFile: [],
			LoadedFile: "",
			ParsedFile: [],
			IsParsed: false,
			Headers: []
		};
	},
	methods: {
		LoadCSV: function(e) {
			let vm = this;
			// Utilize FileReader to load and read the uploaded file
			if (window.FileReader) {
				let reader = new FileReader();
				reader.readAsText(e.target.files[0]);
				// On load save the result in the variable
				reader.onload = function(event) {
					vm.LoadedFile = event.target.result;
				};
				// Manage errors
				reader.onerror = function(evt) {
					if (evt.target.error.name == "NotReadableError") {
						alert("Canno't read file !");
					}
				};
			} else {
				alert("FileReader are not supported in this browser.");
			}
		},
		ParseFile: function(csv, file) {
			if (this.LoadedFile == "") {
				alert("No file was loaded");
				return;
			}
			let vm = this;
			// Change the IsParsed status
			vm.IsParsed = true;
			let lines = csv.split("\n");

			// Check if uploaded file was checked as having headers
			vm.CheckHeaders();

			if (vm.HasHeaders) {
				vm.Headers = lines[0].split(",");
			} else {
				// If doesn't have headers, create it with standard values
				for (let item in lines[0].split(",")) {
					vm.Headers.push("Insert Header");
				}
			}
			// Elaborate the body of the file, if it has Headers skip them
			lines.map(function(line, indexLine) {
				if (vm.HasHeaders && indexLine < 1) {
					return;
				}
				file.push(line.split(","));
			});
			// delete the last line that will be undefined
			file.pop();
		},
		DeleteColumn: function(header) {
			let vm = this;
			// Store the index of the interested column/header
			let HeaderIndex = vm.Headers.indexOf(header);
			// Delete it and delete all the corresponding values
			vm.Headers.splice(HeaderIndex, 1);
			vm.ParsedFile.map(function(data, i) {
				vm.ParsedFile[i].splice(HeaderIndex, 1);
			});
		},
		AddColumn: function(header) {
			let vm = this;
			let headerIndex = vm.Headers.indexOf(header);
			// Same thing as in the DeleteColumn method, here it adds a column and the corresponding cells with standard values
			vm.Headers.splice(headerIndex + 1, 0, "Insert Header");
			vm.ParsedFile.map(function(data, i) {
				vm.ParsedFile[i].splice(headerIndex + 1, 0, "Insert Value");
			});
		},
		ToJSON: function(headers, file) {
			let result = [];
			// Parse through the ParsedFile
			file.map(function(item, index) {
				let Obj = {};
				// Skip the header
				if (index < 1) {
					return;
				}
				// Create the "key: value" elements to push into the result
				item.map(function(data, idx) {
					if (data != "") {
						Obj[headers[idx]] = data;
					} else {
						return;
					}
				});
				if (Object.entries(Obj).length != 0) {
					result.push(Obj);
				}
			});

			return result;
		},
		PostData: function(data) {
			console.log(data);
			axios.post("", data);
		},
		SaveJSON: function(destinationFile) {
			let vm = this;
			destinationFile = vm.ToJSON(vm.Headers, vm.ParsedFile);
			console.log(destinationFile);
			PostData(destinationFile);
		},
		CheckHeaders: function() {
			this.HasHeaders = document.getElementById("HasHeaders").checked;
		}
	}
};
</script>
<style>
.btn-primary {
	background-color: #6a1b9a !important;
	border: 1px solid #6a1b9a;
}
input {
	background-color: rgba(0, 0, 0, 0);
	border: none;
}
table {
	border: 1px solid grey;
}
thead {
	background-color: #6a1b9a;
}
th input {
	color: white;
	font-weight: bold;
}
.close {
	color: white !important;
}
</style>
