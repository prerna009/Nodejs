import { platform, arch, cpus, totalmem, freemem, homedir, tmpdir } from "os";

console.log("Platform = ", platform());  // Platform = win32
console.log("Architecture = ", arch()); // Architecture = x64
console.log("CPU Information = ", cpus()); // info. of cpu cores
console.log("CPU Length = ", cpus().length); // CPU length = 4

console.log("Total Amount of Memory in Bytes = ", totalmem()); // Total Amount of Memory in Bytes =  17049014272
console.log("Free Memory in Bytes = ", freemem()); // Free Memory in Bytes =  8662138880

const totalMemoryGB = totalmem() / 1024 / 1024 / 1024;
console.log("Total Memory in GB = ", totalMemoryGB); // Total Memory in GB =  15.878131866455078

console.log("Current Home Directory = ", homedir()); // Current Home Directory =  C:\Users\Nimap
console.log("Temporary Directory = ", tmpdir()); // Temporary Directory =  C:\Users\Nimap\AppData\Local\Temp