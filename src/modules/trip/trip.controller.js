export const createTrip = async (req, res) => {

    const {title,price}=req.body;
    
    res.status(201).json({ message: 'Trip created successfully' });

}