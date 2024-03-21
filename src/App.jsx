import { Navigate, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Layout,
  Login,
  TaskDetails,
  Tasks,
  Trash,
  Users,
} from "./Pages";
import { Toaster } from "sonner";

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to={"/dashboard"} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </main>
  );
}

export default App;
