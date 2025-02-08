import { eventSchema as Event } from "../models/eventModel.js";
import cloudinary from "../lib/cloudinary.js";

export const handleCreateEvents = async (req, res) => {
    try {
        if (!req.user || req.user.isGuest) {
            return res.status(403).json({ message: "Login with email ID to create an event." });
        }
        const { title, description, date, location, image } = req.body;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        // Upload Base64 image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(image, {
            folder: "events"
        });

        // Save event with Cloudinary image URL
        const event = new Event({ 
            title, 
            description, 
            date, 
            location, 
            image: uploadedImage.secure_url,  // Save Cloudinary URL
            createdBy: req.user._id,
            attendees: ""
        });

        await event.save();
        res.json(event);
    } catch (error) {
        console.log('Error in create event controller:', error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const handleGetEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("createdBy", "username") 
        res.json(events);
    } catch (error) {
        console.log('error in get event controller', error.message);
        res.status(500).json({ message: "Internal server error" })
    }
};

export const viewEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate("createdBy", "username");;
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const handleDeleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id; // Get user ID from authentication middleware

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Only the event owner can delete the event!" });
        }

        await Event.findByIdAndDelete(id);
        res.json({ message: "Event deleted successfully!" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

  
