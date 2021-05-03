/*
 * lakeFS API
 * lakeFS HTTP API
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


package io.treeverse.lakefs.clients.api.model;

import java.util.Objects;
import java.util.Arrays;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.IOException;

/**
 * RevertCreation
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen")
public class RevertCreation {
  public static final String SERIALIZED_NAME_REF = "ref";
  @SerializedName(SERIALIZED_NAME_REF)
  private String ref;

  public static final String SERIALIZED_NAME_PARENT_NUMBER = "parent_number";
  @SerializedName(SERIALIZED_NAME_PARENT_NUMBER)
  private Integer parentNumber;


  public RevertCreation ref(String ref) {
    
    this.ref = ref;
    return this;
  }

   /**
   * the commit to revert, given by a ref
   * @return ref
  **/
  @ApiModelProperty(required = true, value = "the commit to revert, given by a ref")

  public String getRef() {
    return ref;
  }


  public void setRef(String ref) {
    this.ref = ref;
  }


  public RevertCreation parentNumber(Integer parentNumber) {
    
    this.parentNumber = parentNumber;
    return this;
  }

   /**
   * when reverting a merge commit, the parent number (starting from 1) relative to which to perform the revert.
   * @return parentNumber
  **/
  @ApiModelProperty(required = true, value = "when reverting a merge commit, the parent number (starting from 1) relative to which to perform the revert.")

  public Integer getParentNumber() {
    return parentNumber;
  }


  public void setParentNumber(Integer parentNumber) {
    this.parentNumber = parentNumber;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RevertCreation revertCreation = (RevertCreation) o;
    return Objects.equals(this.ref, revertCreation.ref) &&
        Objects.equals(this.parentNumber, revertCreation.parentNumber);
  }

  @Override
  public int hashCode() {
    return Objects.hash(ref, parentNumber);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RevertCreation {\n");
    sb.append("    ref: ").append(toIndentedString(ref)).append("\n");
    sb.append("    parentNumber: ").append(toIndentedString(parentNumber)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}

