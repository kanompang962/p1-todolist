import { useEffect, useState } from "react";
import "./App.css";
import ListTable from "./components/ListTable";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { getStorage, setStorage } from "./services/service";

function App() {
  const [listContent, setListContent] = useState([]);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!getStorage()) {
      setStorage(listContent);
    } else {
      setStorage(getStorage());
    }
    setDel(false);
  }, [del]);

  // Add
  const onSubmit = ({ content }) => {
    if (content) {
      if (edit) {
        // Edit Content
        const result = getStorage().map((item) => {
          if (item.id === editId) {
            return { ...item, data: content };
          }
          return item;
        });

        setStorage(result);
        reset({ content: "" });
        setEdit(false);
        setEditId(null);
      } else {
        // New Content
        const newContent = {
          id: uuidv4(),
          data: content,
        };
        // setListContent([...listContent, newContent]);
        setStorage([...getStorage(), newContent]);
        reset({ content: "" });
      }
    }
  };
  // Delete
  const removeContent = (id) => {
    const result = getStorage().filter((item) => item.id !== id);
    setStorage(result);
    setDel(true);
  };
  // Edit
  const editContent = (id) => {
    if (id) {
      setEdit((prev) => !prev);
      setEditId(id);
      const result = getStorage().find((item) => item.id === id);
      reset({ content: result.data });
    }
  };

  // Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-center md:items-center w-full h-screen relative">
        <div className="p-4 py-10 ms:py-0 md:p-20 bg-white rounded-xl overflow-hidden card">
          <div className="mb-6">
            <h1 className="text-[48px] font-bold mb-4 text-gradient">
              Todo<span className="">List</span>
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <TextField
                  type="text"
                  variant="outlined"
                  {...register("content", { required: true, minLength: 5 })}
                  error={errors.content ? true : false}
                  // helperText={errors.content ? "minLength 5" : ""}
                />
                <div className="flex flex-row gap-4 w-full">
                  <Button
                    sx={{
                      width: "100%",
                    }}
                    className={edit ? "bg-yellow-gradient" : "bg-blue-gradient"}
                    // color={edit ? "warning" : "success"}
                    variant="contained"
                    type="submit"
                  >
                    {edit ? "Edit" : "Submit"}
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      reset({ content: "" });
                      setEdit(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <ListTable
            listContent={getStorage() ? getStorage() : listContent}
            editContent={editContent}
            removeContent={removeContent}
          />
        </div>
        <div className="absolute bottom-2 left-0 ml-4 md:text-dimWhite">
          2023 Dev. Thianchai Chamnan.
        </div>
      </div>
    </>
  );
}

export default App;
