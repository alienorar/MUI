import { useEffect, useState } from "react";
import BasicTable from "../../components/global-table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { brand } from "@service";
import { BrandModal } from "@components";
import { category } from "@service";
// import { useParams } from "react-router-dom";


const Index = () => {
    const [open, setOpen] = useState(false);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [update, setUpdate] = useState({});
    // const { id } = useParams()
    // console.log(id);

    const handleClose = () => {
        setOpen(false);
    };
    const openModal = async () => {
        setOpen(true);
    };


    // fetch categories
    const fetchCategories = async () => {
        try {
            const res = await category.get();
            const fetchedCategories = res?.data?.data?.categories;
            setCategories(fetchedCategories);
            console.log(categories);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // openModal to create a new  brand 

    const openModalForBrand = () => {
        fetchCategories()
        openModal()
        getBrand()
    }

    // get 
    const getBrand = async () => {
        const resp = await brand.get()
        if (resp.status === 200) {
            const data = resp.data?.data?.brands
            setBrands(data);
        }
    };


    // delete 
    const deleteBrand = (id) => async () => {
        const resp = await brand.delete(id)
        if (resp.status === 200) {
            getBrand()
        }
    };

    // edit
    const editBrand = (item) => () => {
        openModal()
        setUpdate(item);
    };

    useEffect(() => {
        getBrand();
    }, []); 


    return (
        <div>
            <BrandModal open={open} handleClose={handleClose} getData={getBrand} update={update} categories={categories} />
            <Button
                variant="contained"
                color="success"
                onClick={openModalForBrand}
                className="mb-3"
            >
                Add Brand
            </Button>
            <BasicTable headerData={["T/R", "Brand Name", "Actions"]}>
                {brands?.map((row, index) => (
                    <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center" className="flex gap-3">
                            <Button
                                variant="contained"
                                color="primary"
                                className=" w-[80px]"
                                onClick={editBrand(row)}
                            >
                                edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                className=" w-[80px]"
                                onClick={deleteBrand(row.id)}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </BasicTable>
        </div>
    );
};

export default Index; 