import {useHttp} from "../hooks/http.hooks";

const useJobService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = "";
    const _apiKey = "";
    const _baseOffset = 0;

    const getAllJobs = async (offset = _baseOffset) => {
        const res = await request(`{_apiBase}`)
    }
}