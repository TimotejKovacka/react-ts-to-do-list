import React, { useRef, useState } from "react";
import {
  Card,
  FormGroup,
  FormControlLabel,
  Chip,
  Box,
  Checkbox,
  SwipeableDrawer,
  Typography,
  IconButton,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import LoopIcon from "@mui/icons-material/Loop";
import ListIcon from "@mui/icons-material/List";
import { TaskItem } from "./Category";
import { Global } from "@emotion/react";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/Circle";
import dayjs, { Dayjs } from "dayjs";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#242424" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

interface ItemCardProps {
  taskData: TaskItem[];
  taskIndex: number;
  setTaskData: React.Dispatch<[] | TaskItem[]>;
}

export default function ItemCard(props: ItemCardProps) {
  const taskItem = props.taskData[props.taskIndex];
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const customDatePickerRef = useRef();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpened(newOpen);
  };

  const toggleTaskCheckbox = () => {
    props.setTaskData([
      ...props.taskData.filter((task) => task.id !== taskItem.id),
      { ...taskItem, checked: !taskItem.checked },
    ]);
  };

  const toggleSubtaskCheckbox = (
    subTask: { title: string; checked: boolean },
    index: number
  ) => {
    if (!taskItem.subTasks) return;
    props.setTaskData([
      ...props.taskData.filter((task) => task.id !== taskItem.id),
      {
        ...taskItem,
        subTasks: [
          ...taskItem.subTasks.filter((_, idx) => idx !== index),
          { ...subTask, checked: !subTask.checked },
        ],
      },
    ]);
  };

  const onChangeDate = (newVal: null | Dayjs) => {
    if (!newVal) {
      return;
    }
    props.setTaskData([
      ...props.taskData.filter((task) => task.id !== taskItem.id),
      { ...taskItem, due: newVal },
    ]);
    console.log(props.taskData);
  };

  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Card sx={{ backgroundColor: "#242424", border: "1px solid #505050" }}>
        <FormGroup
          sx={{
            ml: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox checked={taskItem.checked} sx={{ color: "#505050" }} />
            }
            onChange={toggleTaskCheckbox}
            label={taskItem.title}
            sx={{ color: "rgba(255, 255, 255, 0.87)", mr: 1 }}
          />
          {taskItem.due && (
            // <Chip
            //   label={checkDate(taskItem.due)}
            //   color='success'
            //   size='small'
            //   sx={{ borderRadius: 1 }}
            //   clickable={true}
            // />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={taskItem.due}
                onChange={(newValue) => {
                  onChangeDate(newValue);
                }}
                onClose={() => setIsDatePickerOpen(false)}
                open={isDatePickerOpen}
                PopperProps={{ anchorEl: customDatePickerRef.current }}
                renderInput={({
                  ref,
                  inputProps,
                  disabled,
                  onChange,
                  value,
                  ...other
                }) => (
                  <div ref={ref}>
                    <input
                      style={{ display: "none" }}
                      value={taskItem.due?.toISOString()}
                      onChange={onChange}
                      disabled={disabled}
                      {...inputProps}
                    />
                    <Chip
                      label='Today'
                      color='success'
                      size='small'
                      sx={{ borderRadius: 1 }}
                      clickable={true}
                      onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    />
                  </div>
                )}
              />
            </LocalizationProvider>
          )}
          {(taskItem.repeated || taskItem.subTasks) && (
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "end",
                alignItems: "center",
                height: "42px",
                mr: 1,
                color: "#505050",
                gap: 0.5,
              }}
              onClick={toggleDrawer(true)}
            >
              {taskItem.subTasks && <ListIcon fontSize='small' />}
              {taskItem.repeated && <LoopIcon fontSize='small' />}
            </Box>
          )}
        </FormGroup>
      </Card>
      <SwipeableDrawer
        anchor='bottom'
        open={drawerOpened}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Box sx={{ p: 1, display: "flex", justifyContent: "right" }}>
            <IconButton color='primary'>
              <MoreHoriz fontSize='large' />
            </IconButton>
          </Box>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={taskItem.checked}
                  sx={{ color: "#505050" }}
                  onChange={toggleTaskCheckbox}
                />
              }
              label={taskItem.title}
              sx={{ color: "rgba(255, 255, 255, 0.87)", mr: 1 }}
            />
          </FormGroup>
          <Box sx={{ ml: "32px" }}>
            {taskItem.description && (
              <Typography sx={{ color: "#737373" }} variant='subtitle1'>
                {taskItem.description}
              </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {taskItem.due && (
                <Chip
                  label={checkDate(taskItem.due)}
                  color='success'
                  size='small'
                  sx={{ borderRadius: 1 }}
                  clickable={true}
                />
              )}
              {taskItem.repeated && (
                <Box
                  sx={{
                    display: "flex",
                    ml: "auto",
                    mr: 1,
                    color: "#505050",
                    gap: 0.5,
                  }}
                >
                  {taskItem.subTasks && <ListIcon fontSize='small' />}
                  <Typography variant='caption'>
                    {`${
                      taskItem.subTasks?.filter((task) => task.checked).length
                    }/${taskItem.subTasks?.length}`}
                  </Typography>
                  {taskItem.repeated && <LoopIcon fontSize='small' />}
                </Box>
              )}
            </Box>
            {taskItem.subTasks && (
              <List>
                {taskItem.subTasks.map((subTask, index) => (
                  <>
                    <ListItem sx={{ p: 0 }}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={subTask.checked}
                              sx={{ color: "#505050" }}
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<CircleIcon />}
                              onClick={() =>
                                toggleSubtaskCheckbox(subTask, index)
                              }
                            />
                          }
                          label={subTask.title}
                          disabled={taskItem.checked}
                          sx={{ color: "rgba(255, 255, 255, 0.87)", mr: 1 }}
                        />
                      </FormGroup>
                    </ListItem>
                    {taskItem.subTasks &&
                      taskItem.subTasks.length - 1 !== index && (
                        <Divider
                          variant='inset'
                          component='li'
                          sx={{
                            background: "#4c4c4c",
                            ml: 4,
                          }}
                        />
                      )}
                  </>
                ))}
              </List>
            )}
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}

function checkDate(value: Dayjs): string {
  if (value.date() === dayjs().date()) {
    return "Today";
  } else if (value.date() === dayjs().date() + 1) {
    return "Tommorow";
  }
  return value.format("D MMM");
}
