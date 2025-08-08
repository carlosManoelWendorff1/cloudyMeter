import React from "react";
import axios, { AxiosResponse } from 'axios';
import { API_URL } from "../routes/AppRoutes";
import Readings from "../models/Readings";

const API_LOCALE = "/api/readings"

const ReadingService = {
    async getReadings(meter: any, startDate: string, endDate: string): Promise<Readings[] | null> {
        try {
          const response = await axios.get(API_URL +  `/api/meters/${meter}/readings`, {
            params: {
              date_start: startDate,
              date_end: endDate
            }
          });
          return response.data;
        } catch (error) {
          return null;
        }
      }

      
    
}

export default ReadingService