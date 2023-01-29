import { useState } from "react";
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  ContainerTypeMap,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ItemCard from "./ItemCard";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import dayjs, { Dayjs } from "dayjs";

export interface TaskItem {
  id: string;
  checked: boolean;
  title: string;
  description?: string;
  due?: Dayjs;
  repeated: boolean;
  subTasks?: {
    checked: boolean;
    title: string;
  }[];
}

type CategoryProps = {
  title: string;
};

// a little function to help us with reordering the result
const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const fakeData = [
  {
    id: uuidv4(),
    checked: false,
    title: "Daily Routine",
    description: "Ladadida ladida",
    repeated: true,
    due: dayjs(),
    subTasks: [
      { checked: false, title: "Face wash" },
      { checked: false, title: "Brush Teeth1" },
      { checked: false, title: "Brush Teeth2" },
      { checked: false, title: "Brush Teeth3" },
      { checked: false, title: "Brush Teeth4" },
    ],
  },
  {
    id: uuidv4(),
    checked: false,
    title: "Facewash",
    repeated: false,
    due: dayjs("2023-01-25"),
  },
];

export default function Category({ title }: CategoryProps) {
  const [data, setData] = useState<[] | TaskItem[]>(fakeData);

  const onDragEnd = (r: DropResult) => {
    if (!r.destination) {
      return;
    }
    const dataItems = reorder(data, r.source.index, r.destination.index);
    setData(dataItems);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant='h6' marginRight={1}>
            {title}
          </Typography>
          <Typography
            variant='subtitle1'
            component='p'
            fontSize='medium'
            lineHeight={2.2}
          >
            {data.length}
          </Typography>
        </Box>
        <Tooltip title='More' placement='top'>
          <IconButton color='primary'>
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {data ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={title}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((item: TaskItem, index: number) => (
                  <Draggable index={index} key={item.id} draggableId={item.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <ItemCard
                          taskData={data}
                          setTaskData={setData}
                          taskIndex={index}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <></>
      )}
    </Box>
  );
}
