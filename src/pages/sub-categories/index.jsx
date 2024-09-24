import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { subCategory } from "@service";
import { Button } from "@mui/material";
import BasicTable from "../../components/global-table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

 const SubCategory = () => {
    const { id } = useParams();
    const [subCategories, setSubCategories] = useState([]);

    // Fetch subcategories of the category
    const getSubCategories = async () => {
        const resp = await subCategory.get(id);

        if (resp.status === 200) {
            const data = resp.data?.subcategories;
            setSubCategories(data);
        }
    };

    useEffect(() => {
        getSubCategories();
    }, [id]);

    return (
        <div>
            <h2>Subcategories of Category {id}</h2>
            <BasicTable headerData={["T/R", "Subcategory Name"]}>
                {subCategories?.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                    </TableRow>
                ))}
            </BasicTable>
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
                Go Back
            </Button>
        </div>
    );
};

 export default SubCategory;


