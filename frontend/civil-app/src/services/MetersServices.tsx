import React from "react";
import axios, { AxiosResponse } from 'axios';
import { API_URL } from "../routes/AppRoutes";
import Readings from "../models/Readings";
import Meters from "../models/Meters";

const API_LOCALE = "/api/meters"

const MetersService = {
    async getMeters(): Promise<Meters[] | null> {
        try {
          const response: AxiosResponse<Meters[]> = await axios.get(`${API_URL + API_LOCALE}`);
          return response.data;
        } catch (error) {
          return null;
        }
      },
}

export default MetersService