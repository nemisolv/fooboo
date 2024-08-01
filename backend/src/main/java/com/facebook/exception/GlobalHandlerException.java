package com.facebook.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;
import java.util.List;

@ControllerAdvice
public class GlobalHandlerException extends ResponseEntityExceptionHandler {


    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalHandlerException.class);


    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorDTO handleGenericException(HttpServletRequest request, Exception ex) {

        LOGGER.error("500: "+ex.getMessage(), ex);
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setTimestamp(new Date());
        errorDTO.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorDTO.setPath(request.getServletPath());
        errorDTO.addError(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
        return errorDTO;
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        LOGGER.error("400: " +ex.getMessage(), ex);
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setTimestamp(new Date());
        errorDTO.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDTO.setPath(((ServletWebRequest) request).getRequest().getServletPath());

        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        fieldErrors.forEach(fieldError -> errorDTO.addError(fieldError.getDefaultMessage()));

        return new ResponseEntity<>(errorDTO, headers, status);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorDTO handleResourceNotFoundException(HttpServletRequest request, ResourceNotFoundException ex) {
        LOGGER.error("404: "+ ex.getMessage(), ex);
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setTimestamp(new Date());
        errorDTO.setStatus(HttpStatus.NOT_FOUND.value());
        errorDTO.setPath(request.getServletPath());
        errorDTO.addError("Resource not found: " + ex.getMessage());
        return errorDTO;
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorDTO handleBadCredential(HttpServletRequest request, Exception ex) {

        LOGGER.info(ex.getMessage());
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setTimestamp(new Date());
        errorDTO.setStatus(HttpStatus.UNAUTHORIZED.value());
        errorDTO.setPath(request.getServletPath());
        errorDTO.addError(ex.getMessage());
        return errorDTO;
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorDTO handleBadRequestException(HttpServletRequest request, BadRequestException ex) {
        LOGGER.error("400: "+ ex.getMessage(), ex);
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setTimestamp(new Date());
        errorDTO.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDTO.setPath(request.getServletPath());
        errorDTO.addError(ex.getMessage());
        return errorDTO;
    }

    @ExceptionHandler(ResourceInUseException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    @ResponseBody
    public ErrorDTO handleResourceInUseException(HttpServletRequest request, ResourceInUseException ex) {
        LOGGER.error("409: "+ ex.getMessage(), ex);
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setTimestamp(new Date());
        errorDTO.setStatus(HttpStatus.CONFLICT.value());
        errorDTO.setPath(request.getServletPath());
        errorDTO.addError(ex.getMessage());
        return errorDTO;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorDTO handleIllegalArgsException(HttpServletRequest request, IllegalArgumentException ex) {
        LOGGER.error("400: "+ ex.getMessage(), ex);
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setTimestamp(new Date());
        errorDTO.setStatus(HttpStatus.BAD_REQUEST.value());
        errorDTO.setPath(request.getServletPath());
        errorDTO.addError(ex.getMessage());
        return errorDTO;
    }

    @Override
    protected ResponseEntity<Object> handleMaxUploadSizeExceededException(
            MaxUploadSizeExceededException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        LOGGER.error("413: " +ex.getMessage(), ex);
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setTimestamp(new Date());
        errorDTO.setStatus(HttpStatus.PAYLOAD_TOO_LARGE.value());
        errorDTO.setPath(((ServletWebRequest) request).getRequest().getServletPath());

        errorDTO.addError("File size too large, max size is: " + ex.getMaxUploadSize() + " bytes");

        return new ResponseEntity<>(errorDTO, headers, status);
    }

    @ExceptionHandler(ResourceIsDeletedException.class)
    @ResponseStatus(HttpStatus.GONE)
    @ResponseBody
    public ErrorDTO handleResourceIsDeletedException(HttpServletRequest request, ResourceIsDeletedException ex) {
        LOGGER.error("410: "+ ex.getMessage(), ex);
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setTimestamp(new Date());
        errorDTO.setStatus(HttpStatus.GONE.value());
        errorDTO.setPath(request.getServletPath());
        errorDTO.addError("Resource is deleted, could not manipulate: " + ex.getMessage());
        return errorDTO;
    }

}
