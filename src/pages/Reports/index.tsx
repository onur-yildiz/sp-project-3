import {
  useGetDppOrganizations,
  useGetInjectionUnit,
} from "../../services/api-service/reportEndpoints";

import Aic from "../../components/DateIntervalEicView/Aic";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CustomAgGridTable from "../../components/CustomAgGridTable";
import Dpp from "../../components/DateIntervalEicView/Dpp";
import PowerPlantView from "../../components/PowerPlantView";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../hooks";
import { useLogoutMutation } from "../../services/api-service/authEndpoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Reports = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [tabValue, setTabValue] = useState("dpp");
  const { data: orgs } = useGetDppOrganizations();
  const { data: iuns } = useGetInjectionUnit();

  const handleTabChange = (_: any, newValue: string) => {
    setTabValue(newValue);
  };

  const handleLogout = async () => {
    await logout().unwrap();
    navigate("/login");
  };

  return (
    <Box>
      <TabContext value={tabValue}>
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            <TabList
              onChange={handleTabChange}
              variant="scrollable"
              allowScrollButtonsMobile
              sx={{ flexGrow: 1 }}
            >
              <Tab label="DPP" value={"dpp"} />
              <Tab label="AIC" value={"aic"} />
              <Tab label="Power Plant Statisitcs" value={"pps"} />
              <Tab label="Organizations" value={"orgs"} />
              <Tab label="Injection Units" value={"iun"} />
            </TabList>
            <Typography sx={{ mr: 2 }} fontWeight="bolder" color="GrayText">
              {user.username}
            </Typography>
            <Button onClick={handleLogout} size="large" color="error">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <TabPanel value="dpp">
          <Dpp />
        </TabPanel>
        <TabPanel value="aic">
          <Aic />
        </TabPanel>
        <TabPanel value="pps">
          <PowerPlantView />
        </TabPanel>
        <TabPanel value="orgs">
          {orgs ? <CustomAgGridTable data={orgs} /> : <LoadingPage />}
        </TabPanel>
        <TabPanel value="iun">
          {iuns ? <CustomAgGridTable data={iuns} /> : <LoadingPage />}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

const LoadingPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default Reports;
