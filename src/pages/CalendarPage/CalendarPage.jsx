import React from "react";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import {
  Eventcalendar,
  snackbar,
  setOptions,
  Popup,
  Button,
  Input,
  Textarea,
  Switch,
  Datepicker,
  SegmentedGroup,
  SegmentedItem,
  CalendarNav,
  CalendarToday,
  CalendarPrev,
  CalendarNext,
  momentTimezone,
  Checkbox,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./calendarPage.css";

// setup Mobiscroll Moment plugin
momentTimezone.moment = moment;

setOptions({
  theme: "ios",
  themeVariant: "light",
});

const now = new Date();

const responsivePopup = {
  medium: {
    display: "anchored",
    width: 400,
    fullScreen: false,
    touchUi: false,
  },
};

const myUsers = [
  {
    name: "Evangel",
    id: 1,
    photo:
      "https://res.cloudinary.com/dfsv0vn6z/image/upload/v1655672117/Kevvkar/placeholder_profiles/profile7_inwzaw.jpg",
  },
  {
    name: "Damir",
    id: 2,
    photo:
      "https://res.cloudinary.com/dfsv0vn6z/image/upload/v1655672117/Kevvkar/placeholder_profiles/profile7_inwzaw.jpg",
  },
  {
    name: "Chidi",
    id: 3,
    photo:
      "https://res.cloudinary.com/dfsv0vn6z/image/upload/v1655672117/Kevvkar/placeholder_profiles/profile7_inwzaw.jpg",
  },
];

function CalendarPage() {
  const [myEvents, setMyEvents] = React.useState([]);
  const [tempEvent, setTempEvent] = React.useState(null);
  const [isOpen, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [anchor, setAnchor] = React.useState(null);
  const [start, startRef] = React.useState(null);
  const [end, endRef] = React.useState(null);
  const [selectUsers, setSelectUsers] = React.useState([]);
  const [popupEventTitle, setTitle] = React.useState("");
  const [popupEventDescription, setDescription] = React.useState("");
  const [popupEventAllDay, setAllDay] = React.useState(true);
  const [popupEventDate, setDate] = React.useState([]);
  const [mySelectedDate, setSelectedDate] = React.useState(now);
  const [view, setView] = React.useState("week");
  const [calView, setCalView] = React.useState({
    schedule: {
      type: "week",
      startTime: "07:00",
      endTime: "19:00",
      startDay: 1,
      endDay: 5,
    },
  });

  const changeView = (event) => {
    let calView;

    switch (event.target.value) {
      case "year":
        calView = {
          calendar: { type: "year" },
        };
        break;
      case "month":
        calView = {
          calendar: {
            labels: true,
            startDay: 1,
            endDay: 5,
            timeCellStep: 60,
            timeLabelStep: 60,
          },
        };
        break;
      case "week":
        calView = {
          schedule: {
            type: "week",
            startTime: "07:00",
            endTime: "19:00",
            startDay: 1,
            endDay: 5,
            timeCellStep: 60,
            timeLabelStep: 60,
          },
        };
        break;
      case "day":
        calView = {
          schedule: {
            type: "day",
            startTime: "07:00",
            endTime: "19:00",
            startDay: 1,
            endDay: 5,
            timeCellStep: 60,
            timeLabelStep: 60,
          },
        };
        break;
      case "agenda":
        calView = {
          calendar: { type: "week" },
          agenda: { type: "week" },
        };
        break;

      default:
        calView = {
          schedule: {
            type: "week",
            startTime: "07:00",
            endTime: "19:00",
            startDay: 1,
            endDay: 5,
          },
        };
    }

    setView(event.target.value);
    setCalView(calView);
  };

  const saveEvent = React.useCallback(() => {
    const newEvent = {
      id: uuidv4(),
      title: popupEventTitle,
      description: popupEventDescription,
      start: popupEventDate[0],
      end: popupEventDate[1],
      allDay: popupEventAllDay,
      users: selectUsers,
      originUser: myUsers[0],
    };
    if (isEdit) {
      // update the event in the list
      const index = myEvents.findIndex((x) => x.id === tempEvent.id);
      const newEventList = [...myEvents];

      newEventList.splice(index, 1, newEvent);
      setMyEvents(newEventList);
      // here you can update the event in your storage as well
      // ...
    } else {
      // add the new event to the list
      setMyEvents([...myEvents, newEvent]);
      // here you can add the event to your storage as well
      // ...
    }
    setSelectedDate(popupEventDate[0]);
    // close the popup
    setOpen(false);
  }, [
    isEdit,
    myEvents,
    popupEventAllDay,
    popupEventDate,
    popupEventDescription,
    popupEventTitle,
    tempEvent,
    selectUsers,
  ]);

  const deleteEvent = React.useCallback(
    (event) => {
      setMyEvents(myEvents.filter((item) => item.id !== event.id));
      setTimeout(() => {
        snackbar({
          button: {
            action: () => {
              setMyEvents((prevEvents) => [...prevEvents, event]);
            },
            text: "Undo",
          },
          message: "Event deleted",
        });
      });
    },
    [myEvents]
  );

  // handle popup form changes
  const titleChange = React.useCallback((ev) => {
    setTitle(ev.target.value);
  }, []);

  const descriptionChange = React.useCallback((ev) => {
    setDescription(ev.target.value);
  }, []);

  const selectUserChange = (event) => {
    const isChecked = event.target.checked;

    // Get User from myUsers Array.
    const checkedUser = myUsers.find(
      (user) => user.id === Number(event.target.value)
    );

    // If user is selected in new event
    if (isChecked === true) {
      setSelectUsers([...selectUsers, checkedUser]);
    }

    // If user is deselected in new event
    if (isChecked === false) {
      setSelectUsers(selectUsers.filter((user) => user.id !== checkedUser.id));
    }

    // If user is selected in edit event
    if (isChecked === true && isEdit) {
      const newUsers = [...selectUsers, checkedUser];
      // setSelectUsers([...selectUsers, checkedUser]);
      console.log("Temp: ", tempEvent.users);
      console.log("Updated: ", newUsers);
    }

    // If user is deselected in edit event
    if (isChecked === false && isEdit) {
      const newUsers = selectUsers.filter((user) => user.id !== checkedUser.id);
      // setSelectUsers(selectUsers.filter((user) => user.id !== checkedUser.id));
      console.log("Temp: ", tempEvent.users);
      console.log("Updated: ", newUsers);
    }
  };

  const allDayChange = React.useCallback((ev) => {
    setAllDay(ev.target.checked);
  }, []);

  const dateChange = React.useCallback((args) => {
    setDate(args.value);
  }, []);

  const onDeleteClick = React.useCallback(() => {
    deleteEvent(tempEvent);
    setOpen(false);
  }, [deleteEvent, tempEvent]);

  const onSelectedDateChange = React.useCallback((event) => {
    setSelectedDate(event.date);
  }, []);

  const loadPopupForm = React.useCallback((event) => {
    setTitle(event.title);
    setDescription(event.description);
    setDate([event.start, event.end]);
    setAllDay(event.allDay || false);
    if (event.users) {
      setSelectUsers([]);
    }
  }, []);

  const onEventClick = React.useCallback(
    (args) => {
      setEdit(true);
      setTempEvent({ ...args.event });
      // fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.domEvent.target);
      setOpen(true);
    },
    [loadPopupForm]
  );

  const onEventCreated = React.useCallback(
    (args) => {
      // createNewEvent(args.event, args.target)
      setEdit(false);
      setTempEvent(args.event);
      // fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.target);
      // open the popup
      setOpen(true);
    },
    [loadPopupForm]
  );

  const onEventDeleted = React.useCallback(
    (args) => {
      deleteEvent(args.event);
    },
    [deleteEvent]
  );

  const onEventUpdated = React.useCallback((args) => {
    // here you can update the event in your storage as well, after drag & drop or resize
    // console.log("Add update code: ", args.event);
  }, []);

  // datepicker options
  const controls = React.useMemo(
    () => (popupEventAllDay ? ["date"] : ["datetime"]),
    [popupEventAllDay]
  );
  const respSetting = React.useMemo(
    () =>
      popupEventAllDay
        ? {
            medium: {
              controls: ["calendar"],
              touchUi: false,
            },
          }
        : {
            medium: {
              controls: ["calendar", "time"],
              touchUi: false,
            },
          },
    [popupEventAllDay]
  );

  // popup options
  const headerText = React.useMemo(
    () => (isEdit ? "Edit event" : "New Event"),
    [isEdit]
  );
  const popupButtons = React.useMemo(() => {
    if (isEdit) {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Save",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    } else {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Add",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    }
  }, [isEdit, saveEvent]);

  const onClose = React.useCallback(() => {
    if (!isEdit) {
      // refresh the list, if add popup was canceled, to remove the temporary event
      setMyEvents([...myEvents]);
    }
    setOpen(false);
  }, [isEdit, myEvents]);

  const customWithNavButtons = () => {
    return (
      <React.Fragment>
        <CalendarNav className="cal-header-nav" />
        <div className="cal-header-picker">
          <SegmentedGroup value={view} onChange={changeView}>
            <SegmentedItem value="year">Year</SegmentedItem>
            <SegmentedItem value="month">Month</SegmentedItem>
            <SegmentedItem value="week">Week</SegmentedItem>
            <SegmentedItem value="day">Day</SegmentedItem>
            <SegmentedItem value="agenda">Agenda</SegmentedItem>
          </SegmentedGroup>
        </div>
        <CalendarPrev className="cal-header-prev" />
        <CalendarToday className="cal-header-today" />
        <CalendarNext className="cal-header-next" />
      </React.Fragment>
    );
  };

  const renderScheduleEvent = React.useCallback((data) => {
    return (
      <div className="event-container">
        <h5>{data.title}</h5>
        <div>
          {data.original.users &&
            data.original.users.map((user, index) => (
              <span key={index}>{user.name}</span>
            ))}
        </div>
      </div>
    );
  }, []);

  return (
    <div>
      <Eventcalendar
        dataTimezone="utc"
        displayTimezone="local"
        timezonePlugin={momentTimezone}
        theme="auto"
        themeVariant="dark"
        view={calView}
        data={myEvents}
        clickToCreate="double"
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        selectedDate={mySelectedDate}
        onSelectedDateChange={onSelectedDateChange}
        onEventClick={onEventClick}
        onEventCreated={onEventCreated}
        onEventDeleted={onEventDeleted}
        onEventUpdated={onEventUpdated}
        renderHeader={customWithNavButtons}
        renderScheduleEvent={renderScheduleEvent}
        cssClass="md-switching-view-cont"
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        headerText={headerText}
        anchor={anchor}
        buttons={popupButtons}
        isOpen={isOpen}
        onClose={onClose}
        responsive={responsivePopup}
      >
        <div className="mbsc-form-group">
          <Input label="Title" value={popupEventTitle} onChange={titleChange} />
          <Textarea
            label="Description"
            value={popupEventDescription}
            onChange={descriptionChange}
          />
        </div>
        <div className="mbsc-form-group">
          {
            <React.Fragment>
              {isEdit ? (
                <React.Fragment>
                  {myUsers.map((user, index) => (
                    <Checkbox
                      key={index}
                      label={user.name}
                      value={user.id}
                      description="Add User"
                      onChange={selectUserChange}
                      defaultChecked={tempEvent.users.some((userObj) =>
                        userObj?.id === user.id ? true : false
                      )}
                    />
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {myUsers.map((user, index) => (
                    <Checkbox
                      key={index}
                      label={user.name}
                      value={user.id}
                      description="Add User"
                      onChange={selectUserChange}
                    />
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          }
        </div>
        <div className="mbsc-form-group">
          <Switch
            label="All-day"
            checked={popupEventAllDay}
            onChange={allDayChange}
          />
          <Input ref={startRef} label="Starts" />
          <Input ref={endRef} label="Ends" />
          <Datepicker
            select="range"
            controls={controls}
            touchUi={true}
            startInput={start}
            endInput={end}
            showRangeLabels={false}
            responsive={respSetting}
            onChange={dateChange}
            value={popupEventDate}
          />
          {isEdit ? (
            <div className="mbsc-button-group">
              <Button
                className="mbsc-button-block"
                color="danger"
                variant="outline"
                onClick={onDeleteClick}
              >
                Delete event
              </Button>
            </div>
          ) : null}
        </div>
      </Popup>
    </div>
  );
}

export default CalendarPage;
