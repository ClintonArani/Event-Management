import { Request, Response } from 'express';
import { EventService } from '../services/event.service';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import fs from 'fs';

const eventSetter = new EventService();

export const addNewEvent = async (req: Request, res: Response) => {
  try {

    let response = eventSetter.createEvent(req.body);

    return res.status(201).json(response);
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({
      error: 'An error occurred while creating the event.',
    });
  }
};


export const fetchAllCreatedEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await eventSetter.getAllEvents();
    return res.status(200).json(allEvents);
  } catch (error) {
    console.error('Error fetching all events:', error);
    return res.status(500).json({
      error: 'An error occurred while fetching the events.',
    });
  }
};

export const updateExistingEvent = async (req: Request, res: Response) => {
  try {

    const response = await eventSetter.updateEvent(req.params.id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({
      error: 'An error occurred while updating the event.',
    });
  }
};
export const removeEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await eventSetter.deleteEvent(id);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({
      error: 'An error occurred while deleting the event.',
    });
  }
};

export const fetchEventByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await eventSetter.getEventByID(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    return res.status(500).json({
      error: 'An error occurred while fetching the event by ID.',
    });
  }
};

export const getUnAssignedEvents = async (req: Request, res: Response) => {
  try {
    const unAssignedEvents = await eventSetter.fetchUnAssignedEvents();
    return res.status(200).json({
      un_assigned_events: unAssignedEvents,
    });
  } catch (error) {
    console.error('Error fetching unassigned events:', error);
    return res.status(500).json({
      error: 'An error occurred while fetching unassigned events.',
    });
  }
};

export const assignEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await eventSetter.setAssigned(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error assigning event:', error);
    return res.status(500).json({
      error: 'An error occurred while assigning the event.',
    });
  }
};
