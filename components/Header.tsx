import { MenuTwoTone } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../redux/categoriesSlice";
import Link from "./Link";

type Props = { title: string };

const Header = ({ title }: Props) => {
  const categories = useSelector(selectCategories);

  const [open, setOpen] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  return (
    <div className="bg-cyan-900 text-white p-2 pt-4 flex justify-center items-center relative">
      <IconButton
        className="absolute left-5 text-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuTwoTone />
      </IconButton>
      <h1 className="text-xl font-extrabold">{title}</h1>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setOpen(false)}
              component={Link}
              href="/"
            >
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          {categories.map((category) => (
            <ListItem key={category.id} disablePadding>
              <ListItemButton
                onClick={() => setOpen(false)}
                component={Link}
                href={`/?category=${category.id}`}
              >
                <ListItemText primary={category.title} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setOpen(false)}
              component={Link}
              href="/manage"
            >
              <ListItemText primary="Category Manager" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
