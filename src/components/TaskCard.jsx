import { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import { AddSubTask, TaskDialog, UserInfo } from "../Components";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-fit bg-white shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div
            className={`flex flex-1 gap-1 items-center text-xs font-medium
              ${PRIOTITYSTYELS[task?.priority]}`}
          >
            <span className="text-sm">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>

          {user?.isAdmin && <TaskDialog task={task} />}
          <span className="text-xs text-gray-600">
            {formatDate(new Date(task?.date))}
          </span>
        </div>

        <div className="flex items-center gap-2 py-1">
          <div className={`w-3 h-3 rounded-full ${TASK_TYPE[task.stage]}`} />
          <h4 className="line-clamp-1 text-sm text-black">{task?.title}</h4>
        </div>

        <div className="w-full border-t border-gray-200 my-1" />
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-sm text-gray-600">
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 ">
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          <div className="flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={`w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1
                  ${BGS[index % BGS?.length]}`}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>

        {/* sub tasks */}
        {task?.subTasks?.length > 0 ? (
          <div className="py-2 border-t border-gray-200">
            <h5 className="text-sm line-clamp-1 text-black">
              {task?.subTasks[0].title}
            </h5>

            <div className="flex items-center justify-center p-2 space-x-8">
              <span className="text-xs text-gray-600">
                {formatDate(new Date(task?.subTasks[0]?.date))}
              </span>
              <span className="bg-blue-600/10 px-2 py-1 rounded-full text-blue-700 text-xs ">
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="py-2 border-t border-gray-200">
              <span className="text-gray-500 text-sm">No Sub Task</span>
            </div>
          </>
        )}
        <div className="w-full pb-1">
          <button
            onClick={() => setOpen(true)}
            disabled={user?.isAdmin ? false : true}
            className="w-full flex gap-1 items-center text-xs text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300"
          >
            <IoMdAdd className="text-sm" />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export default TaskCard;
