import React, { useCallback, useEffect, useState } from "react";
import ReadingService from "../../services/ReadingService";
import Readings from "../../models/Readings";
import DashboardAllReadings from "./DashboardAllReadings";
import { Button, Cascader, Col, DatePicker, DatePickerProps, Input, Row } from "antd";
import Meters from "../../models/Meters";
import MetersService from "../../services/MetersServices";

const DashboardReadings: React.FC = () => {
  const [dataSource, setDataSource] = useState<Readings[] | null>(null);
  const [meters, setMeters] = useState<{ value: string; label: string }[] | undefined>([]);
  const [meter, setMeter] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // adiciona zero à esquerda, se necessário
    const day = date.getDate().toString().padStart(2, '0'); // adiciona zero à esquerda, se necessário
    return `${year}-${month}-${day}`;
  };

  const fetchData = useCallback(async (meter: any, date_start: string, date_end: string) => {
    try {
      let result = await ReadingService.getReadings(meter, date_start, date_end);
      result?.map((r) => {
        r.type = r.sensor_id + " " + r.type;
      });
      setDataSource(result ?? null);
    } catch (error) {
      setDataSource(null);
    }
  }, []);

  const fetchMeters = useCallback(async () => {
    try {
      const result = await MetersService.getMeters();
      const cascaderOptions = result?.map((res) => ({
        value: `${res.id}`,
        label: res.name,
      }));
      setMeters(cascaderOptions);
    } catch (error) {}
  }, []);

  const onChange = (value: any) => { 
    setMeter(value[0])
  };

  useEffect(() => {
    fetchMeters();
  }, [fetchData]);

  const onDateStart: DatePickerProps['onChange'] = (date,dateString) => {
    setStartDate(`${dateString}`)
  };

  const onDateEnd: DatePickerProps['onChange'] = (date,dateString) => {
    setEndDate(`${dateString}`)
  };

  const onSearch = (value: any) => { 
    fetchData(meter, startDate, endDate)
  };

  return (  
    <div style={{ height: "80vh" }}>
      <Row>
        <Col span={5}>
          <label htmlFor="" style={{marginLeft:"1rem"}}> Medidor </label>
          {meters && <Cascader options={meters} onChange={onChange} style={{width:"70%"}}></Cascader>}
        </Col>
        <Col span={4}>
          <div>
            <label htmlFor=""> Data de </label>
            <DatePicker onChange={onDateStart} style={{width:"70%"}}></DatePicker>
          </div>
        </Col>
        <Col span={4}>
          <div>
            <label htmlFor=""> Data ate </label>
            <DatePicker onChange={onDateEnd} style={{width:"70%"}}></DatePicker>
          </div>
        </Col>
        <Col span={4}>
          <Button onClick={onSearch}>Pesquisar</Button>
        </Col>
      </Row>

      {dataSource && (
        <DashboardAllReadings readings={dataSource}></DashboardAllReadings>
      )}  
    </div>
  );
};

export default DashboardReadings;
