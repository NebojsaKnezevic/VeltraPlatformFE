
import type { JSX } from "react";
import { CSFilter } from "../../components/concur-search-filter/csfilter";
import { CSTable } from "../../components/concur-search-table/cstable";


export default function ConcurSearch(): JSX.Element {


    return (
        <>
            <CSFilter />
            <CSTable />
        </>
    );
}
